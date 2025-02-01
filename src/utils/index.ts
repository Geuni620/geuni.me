export const normalize = (text: string): string => {
  return text.trim().toLowerCase().replace(/\s+/g, "-");
};
