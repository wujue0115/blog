import { ChunkModeBuildPlugin } from "unocss/vite";

export type TArticleData = {
  title: string;
  imageList: string[];
  datePublished: string;
  dateModified: string;
  authorList: string[];
};

export const useStructuredData = () => {
  const script = ref<HTMLScriptElement | null>(null);

  const addArticleScript = (data: TArticleData) => {
    script.value = document.createElement("script");

    script.value.type = "application/ld+json";
    script.value.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: data.title,
      image: data.imageList,
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      author: data.authorList,
    });

    document.head.appendChild(script.value);
  };

  const removeArticleScript = () => {
    if (!script.value) return;

    document.head.removeChild(script.value);
    script.value = null;
  };

  return {
    script,
    addArticleScript,
    removeArticleScript,
  };
};
