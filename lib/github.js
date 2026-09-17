async function handleGitHubResponse(res) {
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    if (res.status === 403 || res.status === 429) {
      throw new Error("GitHub API rate limit exceeded. Please try again later.");
    }
    throw new Error(`GitHub API Error: ${res.statusText}`);
  }
  return res.json();
}

const getHeaders = () => {
  const headers = {};
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
};

export async function fetchGitHubUser(username) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });
  return handleGitHubResponse(res);
}

export async function fetchGitHubRepos(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { 
      headers: getHeaders(),
      next: { revalidate: 3600 } 
    }
  );
  const data = await handleGitHubResponse(res);
  return data || [];
}

export async function fetchLanguageStats(repos) {
  const stats = {};
  repos.forEach(repo => {
    if (repo.language) {
      stats[repo.language] = (stats[repo.language] || 0) + 1;
    }
  });
  
  return Object.entries(stats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}
