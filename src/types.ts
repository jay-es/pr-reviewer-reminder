// GitHub API response types
export namespace GH {
  export type Error = {
    documentation_url: string;
    message: string;
  };

  type User = { login: string };

  // https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#list-pull-requests
  export type PullRequest = {
    draft: boolean;
    html_url: string;
    number: number;
    requested_reviewers: User[];
    state: string;
    title: string;
    user: User;
  };

  // https://docs.github.com/en/rest/pulls/reviews?apiVersion=2022-11-28#list-reviews-for-a-pull-request
  export type Review = {
    user: User;
  };
}
