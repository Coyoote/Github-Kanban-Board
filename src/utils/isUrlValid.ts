export function isUrlValid(url: string) {
  const regex = /^https?:\/\/(?:www\.)?github\.com/i;
  return regex.test(url);
}