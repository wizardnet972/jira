import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppearanceService {
  theme = signal<'light' | 'dark'>(this.#storedTheme());
  sidebarCollapsed = signal(localStorage.getItem('jira-sidebar') === 'collapsed');
  workspaceOpen = signal(localStorage.getItem('jira-workspace') !== 'collapsed');
  projectsOpen = signal(localStorage.getItem('jira-projects') !== 'collapsed');

  constructor() {
    this.#applyTheme(this.theme());
  }

  toggleTheme() {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.#applyTheme(next);
  }

  toggleSidebar() {
    this.#toggleFlag(this.sidebarCollapsed, 'jira-sidebar', true);
  }

  toggleWorkspace() {
    this.#toggleFlag(this.workspaceOpen, 'jira-workspace', false);
  }

  toggleProjects() {
    this.#toggleFlag(this.projectsOpen, 'jira-projects', false);
  }

  #toggleFlag(state: ReturnType<typeof signal<boolean>>, key: string, storeCollapsedWhenTrue: boolean) {
    state.update((current) => {
      const next = !current;
      const collapsed = storeCollapsedWhenTrue ? next : !next;
      localStorage.setItem(key, collapsed ? 'collapsed' : 'expanded');
      return next;
    });
  }

  #storedTheme() {
    const stored = localStorage.getItem('jira-theme');
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  #applyTheme(theme: 'light' | 'dark') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('jira-theme', theme);
  }
}
