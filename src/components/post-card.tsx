import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface PostCardProps {
  title: string;
  href: string;
  date: string;
}

export function PostCard({ title, href, date }: PostCardProps) {
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));

  return (
    <Link href={href}>
      <Card className="group relative hover:bg-accent/50 transition-colors">
        <CardHeader>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <CardDescription>{formattedDate}</CardDescription>
        </CardHeader>
        <ChevronRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Card>
    </Link>
  );
}
