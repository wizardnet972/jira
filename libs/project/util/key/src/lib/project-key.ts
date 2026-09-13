export function toProjectKey(value: string) {
  const key = value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '')
    .slice(0, 5);
  return key || 'PRJ';
}
