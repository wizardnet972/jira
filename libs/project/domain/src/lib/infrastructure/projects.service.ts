import { Injectable, computed, inject } from '@angular/core';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { CreateProjectInput, JiraClient, jiraKeys } from '@jira/util-data';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  #client = inject(JiraClient);
  #queryClient = inject(QueryClient);

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

  #selectMutation = injectMutation(() => ({
    mutationFn: (projectId: string) => this.#client.selectProject(projectId),
    onSuccess: () => this.#queryClient.invalidateQueries({ queryKey: jiraKeys.all }),
  }));

  #createMutation = injectMutation(() => ({
    mutationFn: (input: CreateProjectInput) => this.#client.createProject(input),
    onSuccess: () => this.#queryClient.invalidateQueries({ queryKey: jiraKeys.all }),
  }));

  #updateMutation = injectMutation(() => ({
    mutationFn: (input: { projectId: string; name: string; description: string; leadId: string }) =>
      this.#client.updateProject(input.projectId, {
        name: input.name,
        description: input.description,
        leadId: input.leadId,
      }),
    onSuccess: () => this.#queryClient.invalidateQueries({ queryKey: jiraKeys.projects() }),
  }));

  projects = computed(() => this.#projectsQuery.data() ?? []);
  current = computed(() => this.#projectQuery.data() ?? this.#client.currentProject());
  users = computed(() => this.#usersQuery.data() ?? []);

  select(projectId: string) {
    this.#selectMutation.mutate(projectId);
  }

  create(input: CreateProjectInput) {
    return this.#createMutation.mutateAsync(input);
  }

  update(projectId: string, patch: { name: string; description: string; leadId: string }) {
    this.#updateMutation.mutate({ projectId, ...patch });
  }
}
