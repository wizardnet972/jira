export function isWipExceeded(count: number, wipLimit: number | null) {
  return wipLimit != null && count > wipLimit;
}
