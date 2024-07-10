import { defineConfig } from "vitepress";
import { config as themeConfig } from "./configOptions/theme.config";
import { config as viteConfig } from "./configOptions/vite.config";
import { transformPageData } from "./configOptions/transformPageData";
import { genFeed } from "./configOptions/genFeed";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wujue's blog",
  head: [["link", { rel: "icon", href: "/favicon.svg" }]],
  themeConfig,
  srcDir: "posts",
  vite: viteConfig,
  markdown: {
    math: true,
  },
  sitemap: {
    hostname: "https://blog.wujue.dev",
  },
  transformPageData,
  buildEnd: genFeed,
});
