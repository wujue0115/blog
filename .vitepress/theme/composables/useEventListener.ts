export function useEventListener(
  target: HTMLElement | Window = window,
  event: string,
  callback: EventListenerOrEventListenerObject
) {
  onMounted(() => target.addEventListener(event, callback));
  onUnmounted(() => target.removeEventListener(event, callback));
}
