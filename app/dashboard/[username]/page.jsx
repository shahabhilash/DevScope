import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchGitHubUser, fetchGitHubRepos, fetchLanguageStats } from "@/lib/github";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { RepoExplorer } from "@/components/dashboard/RepoExplorer";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DashboardPage({ params }) {
  const username = params.username;

  // Fetch data in parallel
  const [user, repos] = await Promise.all([
    fetchGitHubUser(username),
    fetchGitHubRepos(username),
  ]);

  if (!user) {
    notFound();
  }

  const languageStats = await fetchLanguageStats(repos);
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pb-20">
      <DashboardHeader currentUsername={username} />
      
      <main className="flex-1 container mx-auto px-4 mt-8 space-y-8 max-w-6xl">
        <Suspense fallback={<Skeleton className="h-[250px] w-full rounded-xl" />}>
          <ProfileCard user={user} totalStars={totalStars} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-xl" />}>
          <AIInsightsCard user={user} repos={repos} languages={languageStats} />
        </Suspense>

        <div className="pt-4">
          <Suspense fallback={<Skeleton className="h-[600px] w-full rounded-xl" />}>
            <AnalyticsCharts repos={repos} languageStats={languageStats} />
          </Suspense>
        </div>

        <div className="pt-8 border-t border-border/50">
          <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-xl" />}>
            <RepoExplorer repos={repos} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
