import { Injectable, computed, inject, signal } from '@angular/core';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { JiraClient, jiraKeys } from '@jira/util-data';

@Injectable({ providedIn: 'root' })
export class WorkspaceService {
  #client = inject(JiraClient);
  #queryClient = inject(QueryClient);

  query = signal('');

  #projectsQuery = injectQuery(() => ({
    queryKey: jiraKeys.projects(),
    queryFn: () => this.#client.listProjects(),
  }));

  #projectQuery = injectQuery(() => ({
    queryKey: jiraKeys.project(this.#client.currentProjectId()),
    queryFn: () => this.#client.getProject(this.#client.currentProjectId()),
  }));

  #usersQuery = injectQuery(() => ({
    queryKey: jiraKeys.users(),
    queryFn: () => this.#client.listUsers(),
  }));

  #searchQuery = injectQuery(() => ({
    queryKey: jiraKeys.search(this.query()),
    queryFn: () => this.#client.searchIssues(this.query()),
    enabled: this.query().trim().length > 0,
  }));

  #selectMutation = injectMutation(() => ({
    mutationFn: (projectId: string) => this.#client.selectProject(projectId),
    onSuccess: () => this.#queryClient.invalidateQueries({ queryKey: jiraKeys.all }),
  }));

  projects = computed(() => this.#projectsQuery.data() ?? []);
  currentProject = computed(() => this.#projectQuery.data() ?? this.#client.currentProject());
  users = computed(() => this.#usersQuery.data() ?? []);
  results = computed(() => this.#searchQuery.data() ?? []);
  currentUser = computed(() => {
    const project = this.currentProject();
    return this.users().find((user) => user.id === project.leadId) ?? null;
  });

  selectProject(projectId: string) {
    this.#selectMutation.mutate(projectId);
  }
}
