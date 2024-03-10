<script setup lang="ts">
import { onMounted, ref } from 'vue';

const dialog = ref<HTMLDialogElement>();

// first-time
onMounted(() => {
  if (!localStorage.getItem('pr-rr-account')) {
    dialog.value?.showModal();
    dialog.value?.focus();
  }
});
</script>

<template>
  <button
    aria-label="help"
    class="btn btn-circle btn-outline btn-xs absolute inset-y-0 right-0 my-auto border-gray-300"
    @click="dialog?.showModal()"
  >
    ?
  </button>
  <dialog ref="dialog" class="modal">
    <div class="modal-box max-w-none">
      <button
        aria-label="close"
        class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
        @click="dialog?.close()"
      >
        ✕
      </button>
      <h2 class="mb-2 text-xl font-semibold">PR Reviewer Reminder</h2>
      <p>
        A reminder tool to prevent missing reviewer assignment in Pull Requests.
      </p>
      <h3 class="mb-1 mt-6 font-semibold">Usage</h3>
      <ul class="list-disc space-y-1 pl-6">
        <li>Allow desktop notifications.</li>
        <li>Enter your GitHub account.</li>
        <li>
          Enter the repository you want to monitor in the format of
          "owner/repo".
        </li>
        <li>
          If accessing a private repository, enter a Personal Access Token
        </li>
        <li>
          Checks the repositories every 20 minutes, and displays desktop
          notifications if all of the following apply:
          <ul class="mt-1 list-[circle] pl-6">
            <li>Status is open</li>
            <li>Not a draft</li>
            <li>Created by you</li>
            <li>Reviewers are not assigned</li>
          </ul>
        </li>
        <li>
          Manual checks are also available through the button. (The timer will
          be reset.)
        </li>
      </ul>
      <h3 class="mb-1 mt-6 font-semibold">Note</h3>
      <p>
        Your inputs are saved in localStorage, eliminating the need to re-enter
        them in the future.
      </p>
      <p>
        These are only used for accessing GitHub and not shared elsewhere, but
        feel free to refrain from usage if concerned.
      </p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
