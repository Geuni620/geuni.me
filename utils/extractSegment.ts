export const extractSegment = (url: string, index = 2): string | null => {
  const segments = url.split('/').filter((segment) => segment.trim() !== '');
  return segments.length >= index ? segments[index - 1] : null;
};
