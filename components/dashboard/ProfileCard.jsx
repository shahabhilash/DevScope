import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Link as LinkIcon, Building, Calendar, Users, Star } from "lucide-react";
import Image from "next/image";

export function ProfileCard({ user, totalStars }) {
  const accountAge = new Date().getFullYear() - new Date(user.created_at).getFullYear();

  return (
    <Card className="glass overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl shrink-0">
            <Image 
              src={user.avatar_url} 
              alt={`${user.login}'s avatar`} 
              fill
              sizes="128px"
              priority
              className="object-cover" 
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{user.name || user.login}</h1>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                @{user.login}
              </a>
            </div>
            
            {user.bio && <p className="text-sm text-foreground/90 max-w-2xl leading-relaxed">{user.bio}</p>}
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {user.location && (
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {user.location}</div>
              )}
              {user.company && (
                <div className="flex items-center gap-1"><Building className="w-4 h-4" /> {user.company}</div>
              )}
              {user.blog && (
                <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                  <LinkIcon className="w-4 h-4" /> Website
                </a>
              )}
              <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {new Date(user.created_at).getFullYear()} ({accountAge} yrs)</div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <StatBox label="Followers" value={user.followers.toLocaleString()} icon={<Users className="w-4 h-4 text-blue-500" />} />
            <StatBox label="Following" value={user.following.toLocaleString()} icon={<Users className="w-4 h-4 text-purple-500" />} />
            <StatBox label="Total Stars" value={totalStars.toLocaleString()} icon={<Star className="w-4 h-4 text-yellow-500" />} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatBox({ label, value, icon }) {
  return (
    <div className="bg-muted/30 rounded-xl p-4 min-w-[120px] flex-1 flex flex-col items-center justify-center border border-border/50">
      <div className="flex items-center gap-2 mb-1 text-muted-foreground text-xs font-medium uppercase tracking-wider">
        {icon} {label}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
