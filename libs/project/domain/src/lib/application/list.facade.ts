import { Injectable, computed, inject, signal } from '@angular/core';
import { filterProjects } from '@jira/project-util-filters';
import { ProjectsService } from '../infrastructure/projects.service';

@Injectable()
export class ListFacade {
  #projects = inject(ProjectsService);
  query = signal('');

  projects = computed(() => {
    const users = this.#projects.users();
    return filterProjects(this.#projects.projects(), this.query()).map((project) => ({
      ...project,
      lead: users.find((user) => user.id === project.leadId) ?? null,
    }));
  });

  open(projectId: string) {
    this.#projects.select(projectId);
  }
}
