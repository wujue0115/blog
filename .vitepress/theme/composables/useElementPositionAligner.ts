export const useElementPositionAligner = (
  trigger: Ref,
  elRef: Ref<HTMLElement>
) => {
  const alignElementPosition = () => {
    nextTick(() => {
      if (!elRef.value) return;
      const el = elRef.value;
      el.style.left = "0";
      const right = el.getBoundingClientRect().left + el.offsetWidth;

      if (right > window.innerWidth) {
        const dif = right - window.innerWidth;
        const offset = 10;
        el.style.left = `${el.offsetLeft - dif - offset}px`;
      }
    });
  };

  watch(trigger, alignElementPosition);
};
