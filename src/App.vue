<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { useCheckPulls } from './composables/useCheckPulls';
import { useInterval } from './composables/useInterval';
import { useNotificationPermission } from './composables/useNotificationPermission';
import PatInput from './conponents/PatInput.vue';
import ReposInput from './conponents/ReposInput.vue';
import UsageDialog from './conponents/UsageDialog.vue';

const account = useLocalStorage('pr-rr-account', '');
const reposText = useLocalStorage('pr-rr-repos', '');
const pat = useLocalStorage('pr-rr-pat', '');
const soundEnabled = useLocalStorage('pr-sound-enabled', false);

const { pulls, exec } = useCheckPulls(account, reposText, pat, soundEnabled);
const { restText, reset } = useInterval(20, exec);
const notificationPermission = useNotificationPermission();
</script>

<template>
  <header class="relative mb-4">
    <h1 class="p-4 text-center text-2xl font-light">PR Reviewer Reminder</h1>
    <UsageDialog />
  </header>

  <main>
    <div
      v-if="notificationPermission !== 'granted'"
      class="mb-4 rounded-md border border-error/35 bg-error/10 px-6 py-4 text-sm"
    >
      Browser notifications are not allowed.
    </div>
    <form
      class="flex flex-col gap-y-4 rounded-md border border-gray-300 bg-gray-100 p-4 pt-2"
      @submit.prevent="reset(), exec()"
    >
      <label class="form-control">
        <div class="label">
          <span class="label-text">GitHub account</span>
        </div>
        <input
          v-model="account"
          type="text"
          class="input input-sm input-bordered invalid:input-error"
          placeholder="input your account"
          required
        />
      </label>

      <label class="form-control">
        <div class="label">
          <span class="label-text">
            owner/repo
            <span class="label-text-alt text-secondary">
              (accepts multiple values by line breaks)
            </span>
          </span>
        </div>
        <ReposInput v-model="reposText" />
      </label>

      <label class="form-control">
        <div class="label">
          <span class="label-text">
            personal access token
            <span class="label-text-alt text-secondary">
              (for private repos)
            </span>
          </span>
        </div>
        <PatInput v-model="pat" />
      </label>

      <div>
        <label class="label inline-flex cursor-pointer gap-x-2">
          <input
            v-model="soundEnabled"
            type="checkbox"
            class="checkbox-accent checkbox checkbox-xs rounded-[3px]"
          />
          <span class="label-text">Notify with sound</span>
        </label>
      </div>

      <p class="-mb-2 text-center tabular-nums">
        Auto check in remaining {{ restText }}
      </p>
      <button class="btn btn-primary btn-sm">Check now manually</button>
    </form>

    <ul class="mt-6 list-disc space-y-4 break-all pl-6">
      <li v-for="pr in pulls" :key="pr.url">
        <div :class="pr.error && 'text-error'">{{ pr.title }}</div>
        <a
          :href="pr.url"
          target="_blank"
          rel="noopener noreferrer"
          class="link link-accent"
        >
          {{ pr.url }}
        </a>
      </li>
    </ul>
  </main>

  <footer class="p-3 text-center">
    <a
      href="https://github.com/jay-es/pr-reviewer-reminder"
      target="_blank"
      rel="noopener noreferrer"
    >
      &copy;<span class="link">jay-es</span>
    </a>
  </footer>
</template>
