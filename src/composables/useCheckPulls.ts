import { type Ref, ref } from 'vue';
import soundUrl from '@/assets/maou_se_onepoint09.mp3';

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
  reposText: Ref<string>,
  pat: Ref<string>,
  soundEnabled: Ref<boolean>,
): {
  pulls: Ref<readonly PR[]>;
  exec: () => Promise<void>;
} {
  const pulls = ref<PR[]>([]);

  async function exec() {
    pulls.value = [];

    const repos = reposText.value.split('\n');
    const res = await Promise.all(
      repos.map((repo) => checkPulls(account.value, repo, pat.value)),
    );
    pulls.value = res.flat();

    if (pulls.value.length) {
      new Notification('PR Reviewer Reminder', {
        body: 'Forgot to set reviewers?',
      });

      if (soundEnabled.value) {
        const audio = new Audio(soundUrl);
        audio.volume = 0.25;
        audio.play();
      }
    }
  }

  return { pulls, exec };
}
