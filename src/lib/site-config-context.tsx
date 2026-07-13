import { createContext, useContext, type ReactNode } from "react";
import type { SiteConfig } from "./site-config";

const SiteConfigContext = createContext<SiteConfig | null>(null);

export function SiteConfigProvider({
  value,
  children,
}: {
  value: SiteConfig;
  children: ReactNode;
}) {
  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
}

export function useSiteConfig() {
  const value = useContext(SiteConfigContext);
  if (!value) {
    throw new Error("SiteConfigProvider is missing");
  }
  return value;
}
