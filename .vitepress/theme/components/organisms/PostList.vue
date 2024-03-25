<script lang="ts" setup>
import type { TPost, TTagLogic, TSortType } from "../../types";
import { data as posts } from "../../posts.data";
import PostCard from "../molecules/PostCard.vue";
import Divider from "../atoms/Divider.vue";

import { useFP } from "../../composables/useFP";

const { pipe } = useFP();

const props = withDefaults(
  defineProps<{
    tags?: string[];
    tagLogic?: TTagLogic;
    sortType?: TSortType;
  }>(),
  {
    tags: () => [],
    tagLogic: "and",
    sortType: "publishDateNewToOld",
  }
);

const { tags, tagLogic, sortType } = toRefs(props);

const filterPosts = (_tags: string[]) => (_posts: TPost[]) => {
  return _posts.filter((post) =>
    _tags[tagLogic.value === "and" ? "every" : "some"]((tag) =>
      post.tags.includes(tag)
    )
  );
};

const sortPosts = (_sortType: TSortType) => (_posts: TPost[]) => {
  const compares = {
    publishDateNewToOld: (a: TPost, b: TPost) => b.date.time - a.date.time,
    publishDateOldToNew: (a: TPost, b: TPost) => a.date.time - b.date.time,
    lastUpdatedNewToOld: (a: TPost, b: TPost) =>
      b.lastUpdated.time - a.lastUpdated.time,
    lastUpdatedOldToNew: (a: TPost, b: TPost) =>
      a.lastUpdated.time - b.lastUpdated.time,
  };

  return _posts.sort(compares[_sortType]);
};

const processedPosts = ref<TPost[]>([]);

watch(
  [tags, tagLogic, sortType],
  () => {
    const postsFactory = pipe(
      filterPosts(tags.value),
      sortPosts(sortType.value)
    );
    processedPosts.value = postsFactory(posts);
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <template v-for="(post, index) in processedPosts" :key="index">
      <PostCard :post="post" m="t-8" />
      <Divider m="t-8" />
    </template>
  </div>
</template>
