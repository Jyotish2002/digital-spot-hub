import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  adminLogin,
  adminLogout,
  getAdminSession,
  saveSiteConfig,
} from "@/lib/site-config.functions";
import { useSiteConfig } from "@/lib/site-config-context";
import { siteConfigSchema } from "@/lib/site-config";
import { useServerFn } from "@tanstack/react-start";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as
  string | undefined;

const IMAGE_TARGETS = [
  { value: "hero.illustrationSrc", label: "Hero illustration" },
  { value: "gallery.0.src", label: "Gallery image 1" },
  { value: "gallery.1.src", label: "Gallery image 2" },
  { value: "gallery.2.src", label: "Gallery image 3" },
  { value: "gallery.3.src", label: "Gallery image 4" },
  { value: "gallery.4.src", label: "Gallery image 5" },
  { value: "gallery.5.src", label: "Gallery image 6" },
] as const;

export const Route = createFileRoute("/admin")({
  loader: async () => getAdminSession(),
  component: AdminPage,
});

function AdminPage() {
  const router = useRouter();
  const site = useSiteConfig();
  const { authenticated } = Route.useLoaderData();
  const loginFn = useServerFn(adminLogin);
  const logoutFn = useServerFn(adminLogout);
  const saveFn = useServerFn(saveSiteConfig);
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState("");
  const [uploadTarget, setUploadTarget] =
    useState<(typeof IMAGE_TARGETS)[number]["value"]>("hero.illustrationSrc");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (authenticated) {
      setDraft(JSON.stringify(site, null, 2));
    }
  }, [authenticated, site]);

  const title = useMemo(() => (authenticated ? "Admin Dashboard" : "Admin Login"), [authenticated]);

  function applyImageUrl(target: (typeof IMAGE_TARGETS)[number]["value"], url: string) {
    const next = JSON.parse(draft) as Record<string, unknown>;
    if (target === "hero.illustrationSrc") {
      const hero = next.hero as Record<string, unknown> | undefined;
      if (hero) hero.illustrationSrc = url;
    } else if (target.startsWith("gallery.")) {
      const match = target.match(/^gallery\.(\d+)\.src$/);
      if (match) {
        const index = Number(match[1]);
        const gallery = next.gallery as Array<Record<string, unknown>> | undefined;
        if (gallery?.[index]) {
          gallery[index].src = url;
        }
      }
    }
    setDraft(JSON.stringify(next, null, 2));
  }

  async function handleCloudinaryUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setError("Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET first.");
      return;
    }

    setUploading(true);
    setError(null);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "ar-digital-spot");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const payload = (await response.json()) as {
        secure_url?: string;
        error?: { message?: string };
      };
      if (!response.ok || !payload.secure_url) {
        throw new Error(payload.error?.message ?? "Cloudinary upload failed");
      }

      applyImageUrl(uploadTarget, payload.secure_url);
      setMessage(`Uploaded image to ${uploadTarget}. Save changes to persist it in MongoDB.`);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleLogin() {
    setError(null);
    setMessage(null);
    try {
      await loginFn({ data: { password } });
      setPassword("");
      setMessage("Login successful.");
      await router.invalidate();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed");
    }
  }

  async function handleLogout() {
    setError(null);
    setMessage(null);
    try {
      await logoutFn();
      setDraft("");
      setMessage("Logged out.");
      await router.invalidate();
    } catch (logoutError) {
      setError(logoutError instanceof Error ? logoutError.message : "Logout failed");
    }
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const parsed = siteConfigSchema.parse(JSON.parse(draft));
      await saveFn({ data: parsed });
      setMessage("Saved successfully.");
      await router.invalidate();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary">{title}</div>
              <h1 className="mt-2 text-3xl font-extrabold text-foreground">
                AR Digital Spot Admin
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Edit the full website content here. Changes save into the backend JSON store and
                reflect on the public site after save.
              </p>
            </div>
            {authenticated && (
              <button
                onClick={handleLogout}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Logout
              </button>
            )}
          </div>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {message && (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          )}

          {!authenticated ? (
            <div className="mt-8 max-w-md space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Admin password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="Enter admin password"
                />
              </div>
              <button
                onClick={handleLogin}
                className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.02]"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
                Tip: this editor accepts the full site JSON. Use it to change gallery items,
                services, contact details, pricing, FAQ, and theme colors without touching code.
                Images can be uploaded to Cloudinary and then saved back into MongoDB.
              </div>
              <div className="grid gap-3 rounded-3xl border border-border bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Image target
                  </label>
                  <select
                    value={uploadTarget}
                    onChange={(event) =>
                      setUploadTarget(event.target.value as (typeof IMAGE_TARGETS)[number]["value"])
                    }
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                  >
                    {IMAGE_TARGETS.map((target) => (
                      <option key={target.value} value={target.value}>
                        {target.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Upload to Cloudinary
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCloudinaryUpload}
                    disabled={uploading}
                    className="block w-full cursor-pointer rounded-2xl border border-border bg-white px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-gradient-brand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>
              <label className="block text-sm font-medium text-foreground">Website JSON</label>
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="min-h-[70vh] w-full rounded-3xl border border-border bg-white p-4 font-mono text-xs leading-6 text-foreground outline-none transition-colors focus:border-primary"
                spellCheck={false}
              />
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
                <button
                  onClick={() => setDraft(JSON.stringify(site, null, 2))}
                  className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Reset draft
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
