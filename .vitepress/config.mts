import { defineConfig } from "vitepress";
import { config as themeConfig } from "./configOptions/theme.config";
import { config as vite } from "./configOptions/vite.config";
import { transformPageData } from "./configOptions/transformPageData";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wujue's blog",
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
  themeConfig,
  srcDir: "posts",
  vite,
  markdown: {
    math: true,
  },
  sitemap: {
    hostname: "https://blog.wujue.dev",
  },
  transformPageData,
});
