export function readParam(params: Record<string, string | undefined>, key: string, fallback = '') {
  return params[key] ?? fallback;
}
