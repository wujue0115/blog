import type { DefaultTheme } from "vitepress";

export const config: DefaultTheme.Config = {
  // https://vitepress.dev/reference/default-theme-config
  siteTitle: false,
  logo: {
    light: "/logo.svg",
    dark: "/logo-dark.svg",
  },
  nav: [
    {
      text: "所有文章",
      link: "/post-preview",
    },
    {
      text: "學習文章",
      link: "/learning/vue/2024-03-02-experience-in-developing-a-blog-with-vitepress",
    },
  ],
  sidebar: {
    "/learning/": [
      {
        text: "Vue",
        collapsed: false,
        items: [
          {
            text: "VitePress",
            collapsed: true,
            items: [
              {
                text: "使用 VitePress 開發部落格的心得",
                link: "/learning/vue/2024-03-02-experience-in-developing-a-blog-with-vitepress",
              },
            ],
          },
        ],
      },
      {
        text: "Data Structure & Algorithm",
        collapsed: false,
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

  socialLinks: [{ icon: "github", link: "https://github.com/wujue0115/blog" }],

  search: {
    provider: "local",
  },
};
