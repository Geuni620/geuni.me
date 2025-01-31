interface PostHeaderProps {
  title: string;
  date: string;
  categories: string[] | undefined;
  summary: string | undefined;
  thumbnail: string | undefined;
}

export const PostHeader = ({ title, date }: PostHeaderProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <FormattedDate date={date} />
    </div>
  );
};
