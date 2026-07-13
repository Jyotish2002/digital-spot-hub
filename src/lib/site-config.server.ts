import { clearSession, getSession, updateSession } from "@tanstack/react-start/server";
import { defaultSiteConfig, siteConfigSchema, type SiteConfig } from "./site-config";
import type { MongoClient } from "mongodb";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "dev-admin-session-secret-change-me";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin12345";

const MONGODB_DATA_API_URL = process.env.MONGODB_DATA_API_URL;
const MONGODB_DATA_API_KEY = process.env.MONGODB_DATA_API_KEY;
const MONGODB_DATA_SOURCE = process.env.MONGODB_DATA_SOURCE ?? "Cluster0";
const MONGODB_DATABASE = process.env.MONGODB_DATABASE ?? "ar_digital_spot";
const MONGODB_COLLECTION = process.env.MONGODB_COLLECTION ?? "site_config";
const SITE_CONFIG_ID = "site-config";

const isNativeMongo =
  MONGODB_DATA_API_URL?.startsWith("mongodb://") ||
  MONGODB_DATA_API_URL?.startsWith("mongodb+srv://");

let mongoClient: MongoClient | null = null;

function getMongoPackageName(): string {
  const parts = ["mongo", "db"];
  return parts.join("");
}

async function getMongoClient() {
  if (!MONGODB_DATA_API_URL) {
    throw new Error("MongoDB connection URI is not configured");
  }
  if (!mongoClient) {
    const pkgName = getMongoPackageName();
    const { MongoClient } = await import(pkgName);
    mongoClient = new MongoClient(MONGODB_DATA_API_URL);
    await mongoClient.connect();
  }
  return mongoClient;
}

const sessionConfig = {
  password: SESSION_SECRET,
  name: "__Host-ar-digital-admin",
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  },
};

function requireMongoConfig() {
  if (!MONGODB_DATA_API_URL || !MONGODB_DATA_API_KEY) {
    throw new Error("MongoDB Data API is not configured");
  }

  return {
    url: MONGODB_DATA_API_URL,
    apiKey: MONGODB_DATA_API_KEY,
    dataSource: MONGODB_DATA_SOURCE,
    database: MONGODB_DATABASE,
    collection: MONGODB_COLLECTION,
  };
}

async function mongoAction<T>(action: string, body: Record<string, unknown>): Promise<T> {
  const mongo = requireMongoConfig();
  const response = await fetch(`${mongo.url.replace(/\/$/, "")}/action/${action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: mongo.apiKey,
    },
    body: JSON.stringify({
      dataSource: mongo.dataSource,
      database: mongo.database,
      collection: mongo.collection,
      ...body,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`MongoDB Data API request failed: ${response.status} ${details}`);
  }

  return (await response.json()) as T;
}

export async function readSiteConfig(): Promise<SiteConfig> {
  if (!MONGODB_DATA_API_URL) {
    return defaultSiteConfig;
  }

  if (isNativeMongo) {
    try {
      const client = await getMongoClient();
      const db = client.db(MONGODB_DATABASE);
      const collection = db.collection(MONGODB_COLLECTION);
      const doc = await collection.findOne({ _id: SITE_CONFIG_ID });
      if (!doc || !doc.value) {
        return defaultSiteConfig;
      }
      return siteConfigSchema.parse(doc.value);
    } catch (error) {
      console.warn("Falling back to default site config (native mongo error):", error);
      return defaultSiteConfig;
    }
  }

  if (!MONGODB_DATA_API_KEY) {
    return defaultSiteConfig;
  }

  try {
    const result = await mongoAction<{ document?: { value?: unknown } }>("findOne", {
      filter: { _id: SITE_CONFIG_ID },
    });

    if (!result.document?.value) {
      return defaultSiteConfig;
    }

    return siteConfigSchema.parse(result.document.value);
  } catch (error) {
    console.warn("Falling back to default site config (Data API error):", error);
    return defaultSiteConfig;
  }
}

export async function writeSiteConfig(config: SiteConfig): Promise<SiteConfig> {
  const validated = siteConfigSchema.parse(config);

  if (!MONGODB_DATA_API_URL) {
    return validated;
  }

  if (isNativeMongo) {
    try {
      const client = await getMongoClient();
      const db = client.db(MONGODB_DATABASE);
      const collection = db.collection(MONGODB_COLLECTION);
      await collection.updateOne(
        { _id: SITE_CONFIG_ID },
        {
          $set: {
            _id: SITE_CONFIG_ID,
            value: validated,
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true },
      );
    } catch (error) {
      console.warn("MongoDB native config write failed:", error);
    }
    return validated;
  }

  if (!MONGODB_DATA_API_KEY) {
    return validated;
  }

  try {
    await mongoAction("updateOne", {
      filter: { _id: SITE_CONFIG_ID },
      update: {
        $set: {
          _id: SITE_CONFIG_ID,
          value: validated,
          updatedAt: new Date().toISOString(),
        },
      },
      upsert: true,
    });
  } catch (error) {
    console.warn("MongoDB Data API site config write failed:", error);
  }

  return validated;
}

export async function getAdminAuthState() {
  const session = await getSession<{ authenticated?: boolean }>(sessionConfig);
  return {
    authenticated: session.data.authenticated === true,
  };
}

export async function requireAdminAuth() {
  const session = await getSession<{ authenticated?: boolean }>(sessionConfig);
  if (session.data.authenticated !== true) {
    throw new Error("Unauthorized");
  }
}

export async function loginAdmin(password: string) {
  if (password !== ADMIN_PASSWORD) {
    throw new Error("Invalid admin password");
  }
  await updateSession(sessionConfig, { authenticated: true });
  return { authenticated: true };
}

export async function logoutAdmin() {
  await clearSession(sessionConfig);
  return { authenticated: false };
}
