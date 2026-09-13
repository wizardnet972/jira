import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppearanceService } from '../infrastructure/appearance.service';
import { WorkspaceService } from '../infrastructure/workspace.service';

@Injectable()
export class LayoutFacade {
  #workspace = inject(WorkspaceService);
  #appearance = inject(AppearanceService);
  #router = inject(Router);

  query = this.#workspace.query;
  theme = this.#appearance.theme;
  sidebarCollapsed = this.#appearance.sidebarCollapsed;
  workspaceOpen = this.#appearance.workspaceOpen;
  projectsOpen = this.#appearance.projectsOpen;
  projects = this.#workspace.projects;
  currentProject = this.#workspace.currentProject;
  currentUser = this.#workspace.currentUser;
  results = this.#workspace.results;
  mainLinks = [
    { path: '/board', icon: 'board', label: 'Board', exact: true },
    { path: '/issues', icon: 'issues', label: 'Issues', exact: true },
    { path: '/backlog', icon: 'backlog', label: 'Backlog', exact: false },
    { path: '/sprints', icon: 'sprint', label: 'Active sprint', exact: true },
  ];
  workspaceLinks = [
    { path: '/projects', icon: 'projects', label: 'Projects', exact: true },
    { path: '/sprints/planning', icon: 'planning', label: 'Planning', exact: false },
    { path: '/sprints/report', icon: 'report', label: 'Reports', exact: false },
    { path: '/projects/settings', icon: 'settings', label: 'Settings', exact: false },
  ];
  projectColors = ['#f59e0b', '#a78bfa', '#34d399', '#60a5fa'];

  selectProject(projectId: string) {
    this.#workspace.selectProject(projectId);
  }

  openIssue(issueId: string) {
    this.query.set('');
    void this.#router.navigate(['/issues', issueId]);
  }

  toggleTheme() {
    this.#appearance.toggleTheme();
  }

  toggleSidebar() {
    this.#appearance.toggleSidebar();
  }

  toggleWorkspace() {
    this.#appearance.toggleWorkspace();
  }

  toggleProjects() {
    this.#appearance.toggleProjects();
  }
}
