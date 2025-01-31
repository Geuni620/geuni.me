import { MDXRemote } from "next-mdx-remote/rsc";

interface PostBodyProps {
  content: string;
}

export const PostBody = ({ content }: PostBodyProps) => {
  return <MDXRemote source={content} />;
};
