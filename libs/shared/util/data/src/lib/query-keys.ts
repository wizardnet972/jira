export const jiraKeys = {
  all: ['jira'] as const,
  users: () => [...jiraKeys.all, 'users'] as const,
  projects: () => [...jiraKeys.all, 'projects'] as const,
  project: (projectId: string) => [...jiraKeys.projects(), projectId] as const,
  issues: (projectId: string) => [...jiraKeys.all, 'issues', projectId] as const,
  issue: (issueId: string) => [...jiraKeys.all, 'issue', issueId] as const,
  search: (query: string) => [...jiraKeys.all, 'search', query] as const,
  boards: (projectId: string) => [...jiraKeys.all, 'boards', projectId] as const,
  columns: () => [...jiraKeys.all, 'columns'] as const,
  sprints: (projectId: string) => [...jiraKeys.all, 'sprints', projectId] as const,
};
