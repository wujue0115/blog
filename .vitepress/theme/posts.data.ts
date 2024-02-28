import type { ContentData } from "vitepress";
import { createContentLoader } from "vitepress";
import { formatDate } from "./utils";

interface Post {
  title: string;
  url: string;
  estimatedReadingTime?: string;
  date: {
    time: number;
    string: string;
  };
  lastUpdated: {
    time: number;
    string: string;
  };
  excerpt: string | undefined;
  tags?: string[];
  allTags?: string[];
}

declare const data: Post[];
export { data };

const transformTags = (tags: string | string[] | unknown) => {
  if (Array.isArray(tags)) {
    return tags;
  }

  if (typeof tags === "string") {
    return tags.split(",").map((tag) => tag.trim());
  }

  return [];
};

const getAllTags = (raw: ContentData[]) => {
  const result = Array.from(
    new Set<string>(
      raw.flatMap(({ frontmatter }) => transformTags(frontmatter.tags))
    )
  );

  return result;
};

export default createContentLoader("posts/**/*.md", {
  excerpt: true,
  transform(raw): Post[] {
    const allTags = getAllTags(raw);

    return raw.map(({ url, frontmatter, excerpt }) => ({
      title: frontmatter.title,
      url,
      excerpt: excerpt ? excerpt.split("\n")[1] : undefined,
      estimatedReadingTime: frontmatter.estimatedReadingTime,
      date: formatDate(frontmatter.date),
      lastUpdated: formatDate(frontmatter.lastUpdated),
      tags: transformTags(frontmatter.tags),
      allTags,
    }));
  },
});
