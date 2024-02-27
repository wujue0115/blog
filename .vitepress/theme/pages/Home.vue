<script lang="ts" setup>
import Typer from "super-typer";

const introRef = ref<HTMLElement>();
const isLooping = ref(false);

const typer = new Typer(
  { speed: 70 },
  {
    onChange(text) {
      introRef.value && (introRef.value.innerText = text + "|");
    },
  }
);

const typeLoop = () => {
  if (!isLooping.value) {
    typer.reset();
    return;
  }

  typer
    .type("嗨！歡迎來到我的部落格！")
    .wait(800)
    .type("\n我是 Wujue，一位網頁前端工程師。")
    .wait(800)
    .type("\n在這裡我會分享一些學習筆記、技術研究、生活紀錄等文章。")
    .wait(800)
    .type("\n如果有任何問題歡迎聯繫我哦～")
    .wait(1500)
    .backspace(-1, { speed: 10 })
    .wait(500, {}, { onAfterChange: typeLoop });
};

onMounted(() => {
  isLooping.value = true;
  typeLoop();
});

onUnmounted(() => {
  isLooping.value = false;
});
</script>

<template>
  <div class="fixed inset-0">
    <div class="h-full flex flex-col items-center">
      <div
        class="mt-28 min-w-48 max-w-64 w-15% aspect-square rounded-full overflow-hidden shadow-md shadow-dark"
        md="mt-32"
        dark="shadow shadow-#fff6"
      >
        <img
          src="/wujue.jpg"
          class="w-full h-full object-cover object-0-20% brightness-100%"
          dark="brightness-75%"
          alt="avatar"
        />
      </div>
      <div class="mt-6">
        <ul class="flex">
          <li>
            <a
              title="gmail"
              href="mailto:wujue.0115@gmail.com"
              class="inline-block align-middle i-simple-icons:gmail"
            >
            </a>
          </li>
          <li class="ml-6">
            <a
              title="github"
              href="https://github.com/wujue0115"
              class="inline-block align-middle i-line-md:github-loop"
            ></a>
          </li>
          <li class="ml-6">
            <a
              title="leetcode"
              href="https://leetcode.com/Wujue0115/"
              class="inline-block align-middle i-simple-icons:leetcode"
            ></a>
          </li>
          <li class="ml-6">
            <a
              title="linkedin"
              href="https://www.linkedin.com/in/tzu-yu-cheng-51a611265/"
              class="inline-block align-middle i-simple-icons:linkedin"
            ></a>
          </li>
        </ul>
      </div>
      <div class="mt-4 mb-auto w-full flex justify-center">
        <p
          ref="introRef"
          class="w-80% text-base text-justify break-all leading-10 font-bold"
          md="w-50% text-center"
        ></p>
      </div>
    </div>
  </div>
</template>
