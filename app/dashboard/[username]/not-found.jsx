import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Profile Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        We couldn't find a GitHub user with that username. They might not exist, or the name might be misspelled.
      </p>
      <Link href="/">
        <Button size="lg">Return to Search</Button>
      </Link>
    </div>
  );
}
