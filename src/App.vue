<script setup lang="ts"></script>

<template>
  <header>
    <h1 class="p-4 text-center text-3xl">PR Reviewer Reminder</h1>
  </header>

  <main class="mx-auto w-full max-w-sm px-4">
    <form class="flex flex-col gap-y-4" @submit.prevent>
      <label class="form-control">
        <div class="label">
          <span class="label-text">GitHub account</span>
        </div>
        <input
          type="text"
          class="input input-sm input-bordered invalid:input-error"
          placeholder="input your account"
        />
      </label>

      <label class="form-control">
        <div class="label">
          <span class="label-text">
            owner/repo
            <span class="text-muted label-text-alt">
              (accepts multiple values by line breaks)
            </span>
          </span>
        </div>
        <textarea
          class="textarea textarea-bordered textarea-sm h-24 leading-normal invalid:textarea-error"
          :placeholder="`nodejs/node\nmicrosoft/TypeScript`"
        ></textarea>
      </label>

      <label class="form-control">
        <div class="label">
          <span class="label-text">
            personal access token
            <span class="text-muted label-text-alt">(for private repos)</span>
          </span>
        </div>
        <input
          type="text"
          class="input input-sm input-bordered invalid:input-error"
        />
      </label>

      <button class="btn btn-primary btn-sm mt-4">Check now</button>
    </form>
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
