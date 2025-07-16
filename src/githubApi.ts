import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
});

// Search for users by username (login), limit to 5 results
export async function searchUsernames(query: string) {
  const response = await octokit.request('GET /search/users', {
    q: `${query} in:login`,
    per_page: 5,
  });
  return response.data.items.map((user: any) => user.login);
}

// Fetch repositories for a single username
export async function fetchUserRepos(username: string) {
  const response = await octokit.request('GET /users/{username}/repos', {
    username,
  });
  // Ensure description is always a string
  return response.data.map((repo: any) => ({
    ...repo,
    description: repo.description ?? '',
  }));
}

// Fetch repositories for multiple usernames in parallel
export async function fetchReposForUsernames(usernames: string[]) {
  return Promise.all(
    usernames.map(async (username) => ({
      username,
      repos: await fetchUserRepos(username),
    }))
  );
} 