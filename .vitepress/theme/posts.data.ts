import { createContentLoader } from "vitepress";
import { formatDate } from "./utils";

interface Post {
  title: string;
  url: string;
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

const getAllTags = (raw) => {
  const result = Array.from(
    new Set<string>(
      raw.flatMap(({ frontmatter }) => {
        if (Array.isArray(frontmatter.tags)) {
          return frontmatter.tags;
        }

        if (typeof frontmatter.tags === "string") {
          return frontmatter.tags.split(",").map((tag) => tag.trim());
        }

        return [];
      })
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
      date: formatDate(frontmatter.date),
      lastUpdated: formatDate(frontmatter.lastUpdated),
      tags: frontmatter.tags,
      allTags,
    }));
  },
});
