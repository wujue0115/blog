export interface TPost {
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

export type TSortType =
  | "publishDateNewToOld"
  | "publishDateOldToNew"
  | "lastUpdatedNewToOld"
  | "lastUpdatedOldToNew";
