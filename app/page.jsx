"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Telescope, Activity, PieChart, Sparkles, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const components = { Search, Telescope, Activity, PieChart, Sparkles, TrendingUp, Input, Button, ThemeToggle, motion };
  for (const [name, comp] of Object.entries(components)) {
    if (!comp) console.error(`CRITICAL: Component ${name} is undefined!`);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/dashboard/${username.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none bg-gradient-to-b from-primary/20 to-transparent dark:from-primary/10 opacity-50" />
      
      <header className="container mx-auto px-6 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Telescope className="w-6 h-6" />
          <span>DevScope</span>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 z-10 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
            <Sparkles className="w-3 h-3 mr-1" /> Now with AI Insights powered by Gemini
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Uncover the story behind <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              every GitHub commit.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A premium analytics platform to explore developer profiles, analyze code contributions, and generate AI-driven skill assessments in a beautiful dashboard.
          </p>

          <form onSubmit={handleSearch} className="mt-10 max-w-md mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              type="text"
              className="pl-10 pr-24 py-6 text-lg rounded-full shadow-lg border-muted/50 bg-background/50 backdrop-blur-xl focus-visible:ring-primary focus-visible:border-primary"
              placeholder="Search GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              type="submit"
              className="absolute inset-y-1.5 right-1.5 rounded-full px-6"
            >
              Analyze
            </Button>
          </form>

          <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <FeatureCard
              icon={<Activity className="w-6 h-6 text-blue-500" />}
              title="Deep Analytics"
              description="Visualize contribution graphs, language usage, and repository growth with interactive charts."
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6 text-purple-500" />}
              title="AI Skill Assessment"
              description="Get Gemini-powered insights into developer strengths, expertise, and potential learning paths."
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6 text-emerald-500" />}
              title="Export & Share"
              description="Generate beautiful PDF reports of profiles to share with recruiters or team members."
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl glass border"
    >
      <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}
