interface YoutubeEmbedProps {
  id: string;
}

export const YoutubeEmbed = ({ id }: YoutubeEmbedProps) => {
  const src = `https://www.youtube.com/embed/${id}`;

  return <iframe src={src} className="aspect-video w-full rounded-lg" />;
};
