const SortTypeEnum = {} as const;

SortTypeEnum[(SortTypeEnum["publishDateNewToOld"] = "發布日期: 新->舊")] =
  "publishDateNewToOld";
SortTypeEnum[(SortTypeEnum["publishDateOldToNew"] = "發布日期: 舊->新")] =
  "publishDateOldToNew";
SortTypeEnum[(SortTypeEnum["lastUpdatedNewToOld"] = "最後更新: 新->舊")] =
  "lastUpdatedNewToOld";
SortTypeEnum[(SortTypeEnum["lastUpdatedOldToNew"] = "最後更新: 舊->新")] =
  "lastUpdatedOldToNew";

export { SortTypeEnum };
