export type Priority = 'lowest' | 'low' | 'medium' | 'high' | 'highest';
export type IssueType = 'story' | 'task' | 'bug' | 'epic';
export type IssueStatus = 'todo' | 'in-progress' | 'in-review' | 'done';
export type ProjectType = 'software' | 'business';
export type SprintState = 'future' | 'active' | 'closed';

export const ISSUE_STATUSES: IssueStatus[] = ['todo', 'in-progress', 'in-review', 'done'];

export function nextIssueStatus(status: IssueStatus): IssueStatus | null {
  const index = ISSUE_STATUSES.indexOf(status);
  return index >= 0 && index < ISSUE_STATUSES.length - 1 ? ISSUE_STATUSES[index + 1] : null;
}

export interface User {
  id: string;
  name: string;
  initials: string;
}

export interface Project {
  id: string;
  key: string;
  name: string;
  description: string;
  type: ProjectType;
  leadId: string;
}

export interface Issue {
  id: string;
  key: string;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  priority: Priority;
  projectId: string;
  sprintId: string | null;
  assigneeId: string | null;
  reporterId: string;
  storyPoints: number;
  createdAt: string;
}

export interface Board {
  id: string;
  name: string;
  projectId: string;
}

export interface BoardColumn {
  id: string;
  name: string;
  status: IssueStatus;
  wipLimit: number | null;
}

export interface Sprint {
  id: string;
  name: string;
  projectId: string;
  state: SprintState;
  goal: string;
  startDate: string;
  endDate: string;
}

export interface CreateProjectInput {
  name: string;
  key: string;
  description: string;
  type: ProjectType;
}

export interface CreateIssueInput {
  title: string;
  description: string;
  type: IssueType;
  priority: Priority;
  projectId: string;
  assigneeId: string | null;
  storyPoints: number;
}
