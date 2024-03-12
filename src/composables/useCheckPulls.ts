import { type Ref, ref } from 'vue';
import soundUrl from '@/assets/maou_se_onepoint09.mp3';

type PR = {
  url: string;
  title: string;
  error?: boolean;
};

async function checkPulls(
  account: string,
  repo: string,
  pat: string,
): Promise<PR[]> {
  const fetchOptions = {
    headers: {
      Authorization: pat && `Bearer ${pat}`,
    },
  };
  const pullsUrl = `https://api.github.com/repos/${repo}/pulls`;
  const pullsRes = await fetch(pullsUrl, fetchOptions);
  const pulls = await pullsRes.json();

  if (!pullsRes.ok || !Array.isArray(pulls)) {
    return [
      {
        url: pullsRes.url,
        title: `${pullsRes.status} (${pulls.message})`,
        error: true,
      } satisfies PR,
    ];
  }

  const filteredPulls = pulls.filter(
    (pr) =>
      pr.state === 'open' &&
      pr.draft === false &&
      pr.requested_reviewers.length === 0 &&
      pr.user.login === account,
  );
  const withReviewsPulls = await Promise.all(
    filteredPulls.map(async (pr) => ({
      ...pr,
      reviews: await fetch(`${pullsUrl}/${pr.number}/reviews`, fetchOptions)
        .then((res) => res.json())
        .then((reviews: any[]) =>
          reviews.filter((review) => review.user.login !== account),
        ),
    })),
  );

  return withReviewsPulls
    .filter((pr) => pr.reviews.length === 0)
    .map(({ html_url, title }): PR => ({ url: html_url, title }));
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

    if (!reposText.value) return;

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
