"use client";

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import Recharts to reduce the initial JS bundle size significantly
const PieChart = dynamic(() => import("recharts").then(mod => mod.PieChart), { ssr: false, loading: () => <Skeleton className="w-full h-[300px]" /> });
const Pie = dynamic(() => import("recharts").then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then(mod => mod.Cell), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });
const BarChart = dynamic(() => import("recharts").then(mod => mod.BarChart), { ssr: false, loading: () => <Skeleton className="w-full h-[300px]" /> });
const Bar = dynamic(() => import("recharts").then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(mod => mod.CartesianGrid), { ssr: false });
const LineChart = dynamic(() => import("recharts").then(mod => mod.LineChart), { ssr: false, loading: () => <Skeleton className="w-full h-[300px]" /> });
const Line = dynamic(() => import("recharts").then(mod => mod.Line), { ssr: false });
const Legend = dynamic(() => import("recharts").then(mod => mod.Legend), { ssr: false });

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#ec4899'];

export function AnalyticsCharts({ repos, languageStats }) {
  const topStarredRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);
  
  const engagementData = topStarredRepos.map(repo => ({
    name: repo.name,
    Stars: repo.stargazers_count || 0,
    Forks: repo.forks_count || 0,
  }));

  const sizeData = [...repos].sort((a, b) => (b.size || 0) - (a.size || 0)).slice(0, 7).map(repo => ({
    name: repo.name,
    Size: repo.size || 0,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass">
        <CardHeader>
          <CardTitle>Language Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {languageStats.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {languageStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">No language data</div>
          )}
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Top Repos by Stars</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} tickFormatter={(val) => val.length > 10 ? val.substring(0, 10) + '...' : val} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
              />
              <Legend />
              <Bar dataKey="Stars" fill="#eab308" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Forks" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass lg:col-span-2">
        <CardHeader>
          <CardTitle>Largest Repositories (Size in KB)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sizeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
              />
              <Line type="monotone" dataKey="Size" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
