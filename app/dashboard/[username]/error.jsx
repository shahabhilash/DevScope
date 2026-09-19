"use client";

import { useEffect } from "react";
import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        
        <h1 className="text-2xl font-bold">Something went wrong!</h1>
        
        <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground border">
          {error.message.includes("rate limit") ? (
            <p>
              GitHub API rate limit exceeded. Please create a <code>.env.local</code> file in your project root with a <code>GITHUB_TOKEN</code> to increase your API limit!
            </p>
          ) : (
            <p>{error.message || "Failed to load dashboard data."}</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button onClick={() => reset()} variant="outline">
            Try again
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
