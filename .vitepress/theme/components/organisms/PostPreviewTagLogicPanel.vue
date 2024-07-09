<script lang="ts" setup>
import type { TTagLogic } from "../../types";
import { TagLogicEnum } from "../../enums";
import Selector from "../atoms/Selector/index.vue";

const selectedTagLogic = defineModel<TTagLogic>();
const isOpenSelectorPanel = defineModel<boolean>("isOpenPanel", {
  default: false,
});

const tagLogicItem = ref(TagLogicEnum[selectedTagLogic.value]);
const tagLogicItems = ["And (且)", "Or (或)"];

const handleChange = (item: string) => {
  selectedTagLogic.value = TagLogicEnum[item];
};
</script>

<template>
  <div p="y-4">
    <p font-600>選擇標籤的過濾邏輯</p>
    <div>
      <Selector
        v-model="tagLogicItem"
        v-model:isOpenPanel="isOpenSelectorPanel"
        :items="tagLogicItems"
        @change="handleChange"
        m="t-2"
      >
        <template #input:before>
          <div class="i-material-symbols:filter-alt-outline" m="r-1"></div>
        </template>
      </Selector>
    </div>
  </div>
</template>
