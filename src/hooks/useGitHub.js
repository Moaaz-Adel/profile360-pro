import { useState, useEffect } from "react";

const GITHUB_USERNAME = "Moaaz-Adel";

export default function useGitHub() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        // Parallel fetch of user, repos, followers
        const [userRes, reposRes, followersRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/followers`)
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error("Failed to load GitHub data");
        }

        const user = await userRes.json();
        const repos = await reposRes.json();
        const followers = await followersRes.json();

        // Filter only original repos (not forks)
        const originalRepos = repos.filter((r) => !r.fork);

        // Language statistics
        const languageMap = {};
        repos.forEach((repo) => {
          if (repo.language) {
            languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
          }
        });

        const languages = Object.entries(languageMap)
          .map(([name, count]) => ({ name, value: count }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 6);

        // Top topics from all repos
        const topicMap = {};
        repos.forEach((repo) => {
          (repo.topics || []).forEach((topic) => {
            topicMap[topic] = (topicMap[topic] || 0) + 1;
          });
        });

        const topTopics = Object.entries(topicMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
          .map((t) => t.name);

        // Featured repos (original, sorted by stars or recency)
        const featured = [...originalRepos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);

        // Total stars
        const totalStars = originalRepos.reduce(
          (sum, r) => sum + r.stargazers_count,
          0
        );

        setData({
          user,
          originalRepos,
          languages,
          topTopics,
          featured,
          totalStars,
          followers: followers.length,
          accountAge: getAccountAge(user.created_at)
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHub();
  }, []);

  return { data, loading, error };
}

function getAccountAge(createdDate) {
  const created = new Date(createdDate);
  const now = new Date();
  const years = now.getFullYear() - created.getFullYear();
  return years > 0 ? `${years}+` : "1";
}