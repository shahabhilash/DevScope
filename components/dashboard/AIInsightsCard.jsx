"use client";

import { useEffect, useState } from "react";
import { Sparkles, Brain, Code, Target, BookOpen, Compass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AIInsightsCard({ user, repos, languages }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("/api/insights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user, repos, languages }),
        });
        if (res.ok) {
          const data = await res.json();
          setInsights(data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, [user, repos, languages]);

  if (loading) {
    return (
      <Card className="glass relative overflow-hidden border-purple-500/20">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
            Generating AI Insights...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-20 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !insights) {
    return (
      <Card className="glass border-red-500/20">
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>Failed to generate AI insights. Make sure the Gemini API key is configured.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass relative overflow-hidden border-purple-500/20">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          Gemini AI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-purple-500/5 p-4 rounded-xl border border-purple-500/10">
          <p className="text-sm md:text-base leading-relaxed">{insights.summary || "No summary provided."}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InsightSection icon={<Brain />} title="Expertise" content={insights.expertise || "Analysis unavailable."} color="text-blue-500" />
          <InsightSection icon={<Target />} title="Portfolio Strength" content={insights.portfolioStrength || "Analysis unavailable."} color="text-emerald-500" />
          
          <div className="space-y-3 col-span-1 md:col-span-2 p-4 rounded-xl bg-muted/20 border border-border/50">
            <div className="flex items-center gap-2 font-semibold">
              <Code className="w-4 h-4 text-orange-500" /> Top Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {(insights.skills || []).map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-background rounded-full text-xs font-medium border shadow-sm">
                  {skill}
                </span>
              ))}
              {(!insights.skills || insights.skills.length === 0) && (
                <span className="text-sm text-muted-foreground">No specific skills identified.</span>
              )}
            </div>
          </div>
          
          <InsightSection icon={<BookOpen />} title="Suggested Learning" content={(insights.learningAreas || []).join(", ") || "None"} color="text-pink-500" />
          <InsightSection icon={<Compass />} title="Career Recommendations" content={insights.careerRecommendations || "Analysis unavailable."} color="text-indigo-500" />
        </div>
      </CardContent>
    </Card>
  );
}

function InsightSection({ icon, title, content, color }) {
  return (
    <div className="p-4 rounded-xl bg-muted/20 border border-border/50 space-y-2">
      <div className="flex items-center gap-2 font-semibold">
        <span className={color}>{icon}</span> {title}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
}
