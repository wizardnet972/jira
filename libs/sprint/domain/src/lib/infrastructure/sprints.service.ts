import { Injectable, computed, inject } from '@angular/core';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { JiraClient, jiraKeys } from '@jira/util-data';

@Injectable({ providedIn: 'root' })
export class SprintsService {
  #client = inject(JiraClient);
  #queryClient = inject(QueryClient);

  #sprintsQuery = injectQuery(() => ({
    queryKey: jiraKeys.sprints(this.#client.currentProjectId()),
    queryFn: () => this.#client.listSprints(this.#client.currentProjectId()),
  }));

  #issuesQuery = injectQuery(() => ({
    queryKey: jiraKeys.issues(this.#client.currentProjectId()),
    queryFn: () => this.#client.listIssues(this.#client.currentProjectId()),
  }));

  #usersQuery = injectQuery(() => ({
    queryKey: jiraKeys.users(),
    queryFn: () => this.#client.listUsers(),
  }));

  #startMutation = injectMutation(() => ({
    mutationFn: (sprintId: string) => this.#client.startSprint(sprintId),
    onSuccess: () => this.#queryClient.invalidateQueries({ queryKey: jiraKeys.all }),
  }));

  sprints = computed(() => this.#sprintsQuery.data() ?? []);
  issues = computed(() => this.#issuesQuery.data() ?? []);
  users = computed(() => this.#usersQuery.data() ?? []);
  active = computed(() => this.sprints().find((sprint) => sprint.state === 'active') ?? null);

  start(sprintId: string) {
    this.#startMutation.mutate(sprintId);
  }
}
