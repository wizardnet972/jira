export function toIssueKey(projectKey: string, sequence: number) {
  return `${projectKey}-${sequence}`;
}
