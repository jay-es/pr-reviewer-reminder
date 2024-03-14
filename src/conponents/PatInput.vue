<script setup lang="ts">
import { ref } from 'vue';

const ICON_SIZE = 18;
const model = defineModel<string>({ required: true });
const hidden = ref(true);
</script>

<template>
  <div
    class="input input-sm input-bordered grid grid-cols-[1fr_auto] items-center gap-x-2"
  >
    <input v-model.trim="model" :type="hidden ? 'password' : 'text'" />
    <span class="cursor-pointer text-secondary" @click="hidden = !hidden">
      <!-- prettier-ignore -->
      <svg v-if="hidden" xmlns="http://www.w3.org/2000/svg" :width="ICON_SIZE" :height="ICON_SIZE" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
      <!-- prettier-ignore -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" :width="ICON_SIZE" :height="ICON_SIZE" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
    </span>
  </div>
</template>
