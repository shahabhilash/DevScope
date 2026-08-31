"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star, GitFork, AlertCircle, Clock } from "lucide-react";

export function RepoExplorer({ repos }) {
  const [search, setSearch] = useState("");
  
  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(search.toLowerCase()) || 
    (repo.description && repo.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold">Repositories <span className="text-muted-foreground text-lg font-normal">({repos.length})</span></h2>
        <Input 
          className="max-w-xs bg-background" 
          placeholder="Filter repositories..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.map(repo => (
          <Card key={repo.id} className="glass hover:border-primary/50 transition-colors flex flex-col">
            <CardContent className="p-5 flex flex-col flex-1">
              <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-semibold text-lg text-primary hover:underline break-words line-clamp-1">
                {repo.name}
              </a>
              <p className="text-sm text-muted-foreground mt-2 flex-1 line-clamp-2">
                {repo.description || "No description provided."}
              </p>
              
              <div className="flex items-center flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {repo.language}
                  </div>
                )}
                <div className="flex items-center gap-1 hover:text-yellow-500 transition-colors cursor-default">
                  <Star className="w-3 h-3" /> {repo.stargazers_count}
                </div>
                <div className="flex items-center gap-1 hover:text-purple-500 transition-colors cursor-default">
                  <GitFork className="w-3 h-3" /> {repo.forks_count}
                </div>
                <div className="flex items-center gap-1" title="Open Issues">
                  <AlertCircle className="w-3 h-3" /> {repo.open_issues_count}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredRepos.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
            No repositories found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
