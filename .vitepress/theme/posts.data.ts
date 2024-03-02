import type { ContentData } from "vitepress";
import type { TPost } from "./types";
import { createContentLoader } from "vitepress";
import { useDate } from "./composables/useDate";

const { formatDate } = useDate();

declare const data: TPost[];
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
  transform(raw): TPost[] {
    const posts = raw.filter(({ frontmatter }) => !frontmatter.page);
    const allTags = getAllTags(raw);

    return posts.map(({ url, frontmatter, excerpt }) => ({
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
