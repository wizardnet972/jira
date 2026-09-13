import { Injectable, inject } from '@angular/core';
import { JiraStore } from './jira.store';
import { CreateIssueInput, CreateProjectInput, IssueStatus } from './models';

@Injectable({ providedIn: 'root' })
export class JiraClient {
  #store = inject(JiraStore);

  currentProjectId() {
    return this.#store.currentProjectId();
  }

  currentProject() {
    return this.#store.currentProject();
  }

  userById(id: string | null | undefined) {
    return this.#store.userById(id);
  }

  listUsers() {
    return this.#resolve(this.#store.users());
  }

  listProjects() {
    return this.#resolve(this.#store.projects());
  }

  getProject(projectId: string) {
    return this.#resolve(this.#store.projects().find((project) => project.id === projectId) ?? this.#store.currentProject());
  }

  listIssues(projectId: string) {
    return this.#resolve(this.#store.issuesForProject(projectId));
  }

  getIssue(issueId: string) {
    return this.#resolve(this.#store.issues().find((issue) => issue.id === issueId || issue.key === issueId) ?? null);
  }

  searchIssues(query: string) {
    const term = query.trim().toLowerCase();
    return this.#resolve(
      this.#store
        .issues()
        .filter((issue) => `${issue.key} ${issue.title}`.toLowerCase().includes(term))
        .slice(0, 8)
    );
  }

  listBoards(projectId: string) {
    return this.#resolve(this.#store.boards().filter((board) => board.projectId === projectId));
  }

  listColumns() {
    return this.#resolve(this.#store.columns());
  }

  listSprints(projectId: string) {
    return this.#resolve(this.#store.sprints().filter((sprint) => sprint.projectId === projectId));
  }

  activeSprint(projectId: string) {
    return this.#resolve(this.#store.activeSprint(projectId));
  }

  createProject(input: CreateProjectInput) {
    return this.#resolve(this.#store.createProject(input));
  }

  updateProject(projectId: string, patch: { name: string; description: string; leadId: string }) {
    this.#store.updateProject(projectId, patch);
    return this.#resolve(this.#store.projects().find((project) => project.id === projectId) ?? this.#store.currentProject());
  }

  createIssue(input: CreateIssueInput) {
    return this.#resolve(this.#store.createIssue(input));
  }

  transitionIssue(issueId: string, status: IssueStatus) {
    this.#store.updateIssueStatus(issueId, status);
    return this.#resolve(this.#store.issues().find((issue) => issue.id === issueId) ?? null);
  }

  assignIssueToSprint(issueId: string, sprintId: string | null) {
    this.#store.assignIssueToSprint(issueId, sprintId);
    return this.#resolve(true);
  }

  updateColumnWip(columnId: string, wipLimit: number | null) {
    this.#store.updateColumnWip(columnId, wipLimit);
    return this.#resolve(true);
  }

  startSprint(sprintId: string) {
    this.#store.startSprint(sprintId);
    return this.#resolve(true);
  }

  selectProject(projectId: string) {
    this.#store.selectProject(projectId);
    return this.#resolve(this.#store.currentProject());
  }

  #resolve<T>(value: T) {
    return Promise.resolve(value);
  }
}
