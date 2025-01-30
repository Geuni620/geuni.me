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
  description: string;
  href: string;
}

export function PostCard({ title, description, href }: PostCardProps) {
  return (
    <Link href={href}>
      <Card className="group relative hover:bg-accent/50 transition-colors">
        <CardHeader>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <ChevronRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Card>
    </Link>
  );
}
