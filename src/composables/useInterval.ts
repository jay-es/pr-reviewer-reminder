import { clearInterval, setInterval } from 'worker-timers';
import { type ComputedRef, ref, onUnmounted, computed } from 'vue';

export function useInterval(
  mins: number,
  cb: () => void,
): {
  restText: ComputedRef<string>;
  reset: () => void;
} {
  const restSecs = ref(0);
  const restText = computed(() => {
    const ss = (restSecs.value % 60).toString().padStart(2, '0');
    return `${Math.floor(restSecs.value / 60)}:${ss}`;
  });

  function reset() {
    restSecs.value = mins * 60;
  }

  const intervalId = setInterval(() => {
    if (restSecs.value === 0) {
      cb();
      reset();
    }

    restSecs.value--;
  }, 1000);

  onUnmounted(() => clearInterval(intervalId));

  return { restText, reset };
}
