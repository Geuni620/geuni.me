import dayjs from "dayjs";

interface PostHeaderProps {
  title: string;
  date: string;
  readingTime?: number;
}

interface FormattedDateProps {
  date: string | Date;
  readingTime?: number;
}

export const PostHeader = ({ title, date, readingTime }: PostHeaderProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <FormattedDate date={date} readingTime={readingTime} />
    </div>
  );
};

export const FormattedDate = ({ date, readingTime }: FormattedDateProps) => {
  const formattedDate = dayjs(date).format("MMM D");

  return (
    <time dateTime={dayjs(date).toISOString()}>
      {formattedDate}
      {readingTime && ` · ${readingTime}min`}
    </time>
  );
};
