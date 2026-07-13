import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { defaultSiteConfig, siteConfigSchema, type SiteConfig } from "./site-config";
import {
  getAdminAuthState,
  loginAdmin,
  logoutAdmin,
  readSiteConfig,
  requireAdminAuth,
  writeSiteConfig,
} from "./site-config.server";

export const getPublicSiteConfig = createServerFn({ method: "GET" }).handler(async () => {
  return (await readSiteConfig()) ?? defaultSiteConfig;
});

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  return getAdminAuthState();
});

export const adminLogin = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string().min(1) }))
  .handler(async ({ data }) => {
    return loginAdmin(data.password);
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  return logoutAdmin();
});

export const saveSiteConfig = createServerFn({ method: "POST" })
  .validator(siteConfigSchema)
  .handler(async ({ data }) => {
    await requireAdminAuth();
    return writeSiteConfig(data as SiteConfig);
  });
