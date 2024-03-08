import { type Ref, ref } from 'vue';

type PR = {
  url: string;
  title: string;
};

async function checkPulls(
  account: string,
  repo: string,
  pat: string,
): Promise<PR[]> {
  const pulls: any[] = await fetch(
    `https://api.github.com/repos/${repo}/pulls`,
    {
      headers: {
        Authorization: pat ? `Bearer ${pat}` : '',
      },
    },
  ).then((res) => (res.ok ? res.json() : []));

  return pulls
    .filter(
      (pr) =>
        pr.state === 'open' &&
        pr.draft === false &&
        pr.requested_reviewers.length === 0 &&
        pr.user.login === account,
    )
    .map(({ html_url, title }) => ({ url: html_url, title }));
}

export function useCheckPulls(
  account: Ref<string>,
  repos: Ref<string[]>,
  pat: Ref<string>,
): {
  pulls: Ref<readonly PR[]>;
  exec: () => Promise<void>;
} {
  const pulls = ref<PR[]>([]);
  async function exec() {
    const res = await Promise.all(
      repos.value.map((repo) => checkPulls(account.value, repo, pat.value)),
    );
    pulls.value = res.flat();

    if (pulls.value.length) {
      new Notification('PR Reviewer Reminder', {
        body: 'Forget to set reviewers?',
      });
    }
  }

  return { pulls, exec };
}
