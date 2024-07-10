import type { PageData } from "vitepress";

export const transformPageData = (pageData: PageData) => {
  pageData.frontmatter.head ??= [];
  const head = pageData.frontmatter.head;

  const canonicalUrl = `https://blog.wujue.dev/${pageData.relativePath}`
    .replace(/index\.md$/, "")
    .replace(/\.md$/, ".html");
  const title = `${pageData.title}${
    pageData.frontmatter.page === "home" ? "" : " | Wujue's blog"
  }`;

  // basic meta
  head.push(["link", { rel: "canonical", href: canonicalUrl }]);

  // og meta
  const ogMetaInfos = [
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: pageData.description,
    },
    {
      property: "og:site_name",
      content: "Wujue's blog",
    },
    {
      property: "og:image",
      content: "https://blog.wujue.dev/og-image.png",
    },
    {
      property: "og:image:alt",
      content: "Wujue's blog - logo",
    },
    {
      property: "og:image:type",
      content: "image/png",
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      property: "og:locale",
      content: "zh_TW",
    },
    {
      property: "og:url",
      content: canonicalUrl,
    },
    {
      property: "og:type",
      content: pageData.frontmatter.page ? "website" : "article",
    },
  ];

  // twitter meta
  const twitterMetaInfos = [
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: pageData.description,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:site",
      content: "@wujue0115",
    },
    {
      name: "twitter:image",
      content: "https://blog.wujue.dev/twitter-image.png",
    },
    {
      name: "twitter:image:alt",
      content: "Wujue's blog - logo",
    },
  ];

  if (!pageData.frontmatter.page) {
    ogMetaInfos.push({
      property: "article:published_time",
      content: pageData.frontmatter.date,
    });
    ogMetaInfos.push({
      property: "article:modified_time",
      content: pageData.frontmatter.lastUpdated,
    });
    ogMetaInfos.push({
      property: "article:author",
      content: "Wujue",
    });
    ogMetaInfos.push({
      property: "article:tag",
      content: pageData.frontmatter.tags,
    });
  }

  const metaInfos = [...ogMetaInfos, ...twitterMetaInfos];

  metaInfos.forEach((metaInfo) => {
    head.push(["meta", metaInfo]);
  });
};
