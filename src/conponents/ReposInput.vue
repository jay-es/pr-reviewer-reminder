<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const model = defineModel<string>({ required: true });

const inputRef = ref<HTMLTextAreaElement>();
watchEffect(() => {
  const repos = model.value.split('\n');
  const validity =
    !repos.length || repos.every((str) => /^[^/]+\/[^/]+$/.exec(str));
  inputRef.value?.setCustomValidity(validity ? '' : 'invalid format');
});
</script>

<template>
  <textarea
    ref="inputRef"
    v-model.trim="model"
    class="textarea textarea-bordered textarea-sm h-24 leading-normal invalid:textarea-error"
    :placeholder="`nodejs/node\nmicrosoft/TypeScript`"
    required
  ></textarea>
</template>
