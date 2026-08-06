import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://shogo0x2e.com",
  output: "static",
  trailingSlash: "always",
  build: {
    inlineStylesheets: "always",
  },
  integrations: [sitemap()],
});
