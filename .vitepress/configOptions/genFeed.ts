import path from "path";
import { writeFileSync } from "fs";
import { Feed } from "feed";
import { createContentLoader, type SiteConfig } from "vitepress";

const baseUrl = `https://blog.wujue.dev`;

export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: "Wujue's blog",
    description: "Personal blog sharing learning, tech, life.",
    id: baseUrl,
    link: baseUrl,
    language: "zh-TW",
    image: `${baseUrl}/logo.svg`,
    favicon: `${baseUrl}/favicon.svg`,
    copyright: "Copyright (c) 2024-present, Wujue",
  });

  const posts = await createContentLoader("posts/**/*.md", {
    excerpt: true,
    render: true,
  }).load();

  const processedPosts = posts
    .filter(({ frontmatter }) => !frontmatter.page)
    .sort(
      (a, b) =>
        +new Date(b.frontmatter.date as string) -
        +new Date(a.frontmatter.date as string)
    );

  for (const { url, excerpt, frontmatter, html } of processedPosts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      content: html
        ?.replace(/<p hidden>.*<\/p>.*<hr>\n/s, "")
        .replaceAll("&ZeroWidthSpace;", ""),
      author: [
        {
          name: "Wujue",
          link: "https://github.com/wujue0115",
        },
      ],
      date: frontmatter.date,
    });
  }

  writeFileSync(path.join(config.outDir, "atom.xml"), feed.atom1());
  writeFileSync(path.join(config.outDir, "feed.json"), feed.json1());
}
