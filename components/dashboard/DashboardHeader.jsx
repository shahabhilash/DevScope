"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Telescope, Download, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import Link from "next/link";

export function DashboardHeader({ currentUsername }) {
  const [username, setUsername] = useState(currentUsername);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = username.trim();
    if (query && query !== currentUsername) {
      router.push(`/dashboard/${query}`);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleExportPDF = () => {
    toast.success("Exporting to PDF...");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity" aria-label="Go to Home">
          <Telescope className="w-5 h-5" />
          <span className="hidden sm:inline-block">DevScope</span>
        </Link>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          </div>
          <Input
            className="w-full pl-9 h-9 rounded-full bg-muted/50 border-none focus-visible:ring-1"
            placeholder="Search username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Search GitHub username"
          />
        </form>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleShare} title="Share Profile" aria-label="Share Profile">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleExportPDF} title="Export PDF" aria-label="Export PDF">
            <Download className="h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
