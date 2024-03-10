<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { useCheckPulls } from './composables/useCheckPulls';
import { useInterval } from './composables/useInterval';
import { useNotificationPermission } from './composables/useNotificationPermission';
import ReposInput from './conponents/ReposInput.vue';

const account = useLocalStorage('pr-rr-account', '');
const reposText = useLocalStorage('pr-rr-repos', '');
const pat = useLocalStorage('pr-rr-pat', '');

const { pulls, exec } = useCheckPulls(account, reposText, pat);
const { restText, reset } = useInterval(20, exec);
const notificationPermission = useNotificationPermission();
</script>

<template>
  <header class="mb-4 text-center">
    <h1 class="p-4 text-3xl font-light">PR Reviewer Reminder</h1>
  </header>

  <main class="mx-auto w-full max-w-sm px-4">
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
        <input
          v-model="pat"
          type="text"
          class="input input-sm input-bordered invalid:input-error"
        />
      </label>

      <button class="btn btn-primary btn-sm mt-4 tabular-nums">
        Check now (Auto exec in remaining {{ restText }})
      </button>
    </form>

    <ul class="mt-6 list-disc space-y-4 break-all pl-6">
      <li v-for="pr in pulls" :key="pr.url">
        {{ pr.title }}<br />
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
