import { Injectable, computed, inject } from '@angular/core';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { CreateIssueInput, IssueStatus, JiraClient, jiraKeys } from '@jira/util-data';

@Injectable({ providedIn: 'root' })
export class IssuesService {
  #client = inject(JiraClient);
  #queryClient = inject(QueryClient);

  #issuesQuery = injectQuery(() => ({
    queryKey: jiraKeys.issues(this.#client.currentProjectId()),
    queryFn: () => this.#client.listIssues(this.#client.currentProjectId()),
  }));

  #projectQuery = injectQuery(() => ({
    queryKey: jiraKeys.project(this.#client.currentProjectId()),
    queryFn: () => this.#client.getProject(this.#client.currentProjectId()),
  }));

  #usersQuery = injectQuery(() => ({
    queryKey: jiraKeys.users(),
    queryFn: () => this.#client.listUsers(),
  }));

  #createMutation = injectMutation(() => ({
    mutationFn: (input: CreateIssueInput) => this.#client.createIssue(input),
    onSuccess: () => this.#queryClient.invalidateQueries({ queryKey: jiraKeys.all }),
  }));

  #moveMutation = injectMutation(() => ({
    mutationFn: ({ issueId, status }: { issueId: string; status: IssueStatus }) =>
      this.#client.transitionIssue(issueId, status),
    onSuccess: () => this.#queryClient.invalidateQueries({ queryKey: jiraKeys.all }),
  }));

  issues = computed(() => this.#issuesQuery.data() ?? []);
  project = computed(() => this.#projectQuery.data() ?? this.#client.currentProject());
  users = computed(() => this.#usersQuery.data() ?? []);

  issue(issueId: string) {
    return this.#client.getIssue(issueId);
  }

  create(input: CreateIssueInput) {
    return this.#createMutation.mutateAsync(input);
  }

  move(issueId: string, status: IssueStatus) {
    this.#moveMutation.mutate({ issueId, status });
  }
}
