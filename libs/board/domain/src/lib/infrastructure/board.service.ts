import { Injectable, computed, inject } from '@angular/core';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { IssueStatus, JiraClient, jiraKeys } from '@jira/util-data';

@Injectable({ providedIn: 'root' })
export class BoardService {
  #client = inject(JiraClient);
  #queryClient = inject(QueryClient);

  #projectQuery = injectQuery(() => ({
    queryKey: jiraKeys.project(this.#client.currentProjectId()),
    queryFn: () => this.#client.getProject(this.#client.currentProjectId()),
  }));

  #boardsQuery = injectQuery(() => ({
    queryKey: jiraKeys.boards(this.#client.currentProjectId()),
    queryFn: () => this.#client.listBoards(this.#client.currentProjectId()),
  }));

  #columnsQuery = injectQuery(() => ({
    queryKey: jiraKeys.columns(),
    queryFn: () => this.#client.listColumns(),
  }));

  #issuesQuery = injectQuery(() => ({
    queryKey: jiraKeys.issues(this.#client.currentProjectId()),
    queryFn: () => this.#client.listIssues(this.#client.currentProjectId()),
  }));

  #sprintsQuery = injectQuery(() => ({
    queryKey: jiraKeys.sprints(this.#client.currentProjectId()),
    queryFn: () => this.#client.listSprints(this.#client.currentProjectId()),
  }));

  #usersQuery = injectQuery(() => ({
    queryKey: jiraKeys.users(),
    queryFn: () => this.#client.listUsers(),
  }));

  #moveMutation = injectMutation(() => ({
    mutationFn: ({ issueId, status }: { issueId: string; status: IssueStatus }) =>
      this.#client.transitionIssue(issueId, status),
    onSuccess: () => this.#queryClient.invalidateQueries({ queryKey: jiraKeys.all }),
  }));

  #assignMutation = injectMutation(() => ({
    mutationFn: ({ issueId, sprintId }: { issueId: string; sprintId: string | null }) =>
      this.#client.assignIssueToSprint(issueId, sprintId),
    onSuccess: () => this.#queryClient.invalidateQueries({ queryKey: jiraKeys.all }),
  }));

  #wipMutation = injectMutation(() => ({
    mutationFn: ({ columnId, wipLimit }: { columnId: string; wipLimit: number | null }) =>
      this.#client.updateColumnWip(columnId, wipLimit),
    onSuccess: () => this.#queryClient.invalidateQueries({ queryKey: jiraKeys.columns() }),
  }));

  project = computed(() => this.#projectQuery.data() ?? this.#client.currentProject());
  boards = computed(() => this.#boardsQuery.data() ?? []);
  columns = computed(() => this.#columnsQuery.data() ?? []);
  issues = computed(() => this.#issuesQuery.data() ?? []);
  sprints = computed(() => this.#sprintsQuery.data() ?? []);
  users = computed(() => this.#usersQuery.data() ?? []);

  move(issueId: string, status: IssueStatus) {
    this.#moveMutation.mutate({ issueId, status });
  }

  assignToSprint(issueId: string, sprintId: string | null) {
    this.#assignMutation.mutate({ issueId, sprintId });
  }

  setWip(columnId: string, wipLimit: number | null) {
    this.#wipMutation.mutate({ columnId, wipLimit });
  }
}
