import type { DefaultTheme } from "vitepress";

export const config: DefaultTheme.Config = {
  // https://vitepress.dev/reference/default-theme-config
  siteTitle: false,
  logo: {
    light: "/logo.svg",
    dark: "/logo-dark.svg",
    alt: "The logo of Wujue's blog",
  },
  nav: [
    {
      text: "所有文章",
      link: "/post-preview",
    },
    {
      text: "學習文章",
      link: "/learning/vue/vitepress/2024-03-02-experience-in-developing-a-blog-with-vitepress-1",
    },
  ],
  sidebar: {
    "/learning/": [
      {
        text: "Vue",
        collapsed: true,
        items: [
          {
            text: "VitePress",
            collapsed: true,
            items: [
              {
                text: "使用 VitePress 開發部落格的心得 1 - 頁面開發篇",
                link: "/learning/vue/vitepress/2024-03-02-experience-in-developing-a-blog-with-vitepress-1",
              },
              {
                text: "使用 VitePress 開發部落格的心得 2 - SEO 篇",
                link: "/learning/vue/vitepress/2024-07-11-experience-in-developing-a-blog-with-vitepress-2",
              },
            ],
          },
        ],
      },
      {
        text: "Nuxt",
        collapsed: true,
        items: [
          {
            text: "Issues",
            collapsed: true,
            items: [
              {
                text: "在 Nuxt3 SSR 遇到 Memory leak 的問題與解決方法",
                link: "/learning/nuxt/issues/2024-07-09-memory-leak-problem-in-nuxt3-ssr.md",
              },
            ],
          },
        ],
      },
      {
        text: "Design Pattern",
        collapsed: true,
        items: [
          {
            text: "GoF",
            collapsed: false,
            items: [
              {
                text: "創建型模式 (Creational Patterns)",
                collapsed: true,
                items: [
                  {
                    text: "單例模式 (Singleton Pattern)",
                    link: "/learning/design-pattern/gangs-of-four/creational-pattern/2024-07-12-singleton-pattern.md",
                  },
                  {
                    text: "工廠模式 (Factory Pattern)",
                    link: "/learning/design-pattern/gangs-of-four/creational-pattern/2024-07-17-factory-pattern.md",
                  },
                ],
              },
              {
                text: "行為型模式 (Behavioral Patterns)",
                collapsed: true,
                items: [
                  {
                    text: "策略模式 (Strategy Pattern)",
                    link: "/learning/design-pattern/gangs-of-four/behavioral-pattern/2024-07-22-strategy-pattern.md",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        text: "Data Structure & Algorithm",
        collapsed: true,
        items: [
          {
            text: "解題分享",
            collapsed: false,
            items: [
              {
                text: "LeetCode",
                collapsed: true,
                items: [
                  {
                    text: "32. Longest Valid Parentheses",
                    link: "/learning/data-structure-and-algorithm/problems/leetcode/2024-03-23-leetcode-32-longest-valid-parentheses",
                  },
                  {
                    text: "42. Trapping Rain Water",
                    link: "/learning/data-structure-and-algorithm/problems/leetcode/2024-03-27-leetcode-42-trapping-rain-water",
                  },
                  {
                    text: "44. Wildcard Matching",
                    link: "/learning/data-structure-and-algorithm/problems/leetcode/2024-03-28-leetcode-44-wailcard-matching",
                  },
                  {
                    text: "72. Edit Distance",
                    link: "/learning/data-structure-and-algorithm/problems/leetcode/2024-03-20-leetcode-72-edit-distance",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  socialLinks: [
    {
      icon: "github",
      link: "https://github.com/wujue0115/blog",
      ariaLabel: "GitHub repository for the blog",
    },
    {
      icon: {
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M5 17a2 2 0 1 1 0 4a2 2 0 0 1 0-4M5 3c8.837 0 16 7.163 16 16c0 .184-.003.368-.01.55a1.5 1.5 0 1 1-2.997-.1A13.4 13.4 0 0 0 18 19c0-7.18-5.82-13-13-13c-.15 0-.3.003-.45.008a1.5 1.5 0 0 1-.1-2.999C4.631 3.003 4.815 3 5 3m0 7a9 9 0 0 1 8.98 9.599a1.5 1.5 0 1 1-2.993-.198a6 6 0 0 0-6.388-6.388a1.5 1.5 0 0 1-.197-2.993C4.6 10.007 4.799 10 5 10"/></g></svg>`,
      },
      link: "https://blog.wujue.dev/atom.xml",
      ariaLabel: "RSS",
    },
    {
      icon: {
        svg: `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" ><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --><svg width="800px" height="800px" viewBox="-10 -5 1034 1034" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><path fill="currentColor" d="M854 175q-27 0 -46 19t-19 45.5t18.5 45t45 18.5t45.5 -18.5t19 -45t-18.5 -45.5t-44.5 -19zM205 192l-34 34q-83 83 -88 154t68 144l82 82q45 46 48.5 78t-33.5 69v0q-16 19 -15.5 44.5t18.5 43.5t43.5 18.5t44.5 -15.5l1 1q25 -25 47 -32t45.5 4.5t53.5 41.5l95 96 q75 74 147.5 70t155.5 -87l33 -34l-71 -72l-18 18q-47 47 -84 47.5t-82 -44.5l-112 -112q-86 -86 -169 -17l-11 -11q35 -42 31.5 -83t-45.5 -82l-100 -101q-31 -31 -40.5 -56.5t1 -51.5t42.5 -59l17 -17zM703 326q-28 0 -46.5 19t-18.5 45.5t18.5 45.5t45 19t45.5 -19 t19 -45.5t-18.5 -45t-44.5 -19.5zM551 477q-27 0 -46 19t-19 45.5t19 45.5t45.5 19t45.5 -19t19 -45.5t-19 -45t-45 -19.5z" /></svg>`,
      },
      link: "https://blog.wujue.dev/feed.json",
      ariaLabel: "JSON Feed",
    },
  ],

  search: {
    provider: "local",
  },
};
