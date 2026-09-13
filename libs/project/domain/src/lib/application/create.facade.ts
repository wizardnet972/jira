import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CreateProjectInput, ProjectType } from '@jira/util-data';
import { toProjectKey } from '@jira/project-util-key';
import { ProjectsService } from '../infrastructure/projects.service';

@Injectable()
export class CreateFacade {
  #projects = inject(ProjectsService);
  #router = inject(Router);
  name = signal('');
  key = signal('');
  description = signal('');
  type = signal<ProjectType>('software');
  previewKey = computed(() => toProjectKey(this.key() || this.name()));

  save() {
    const input: CreateProjectInput = {
      name: this.name(),
      key: this.previewKey(),
      description: this.description(),
      type: this.type(),
    };
    if (!input.name.trim()) {
      return;
    }
    void this.#projects.create(input).then(() => this.#router.navigateByUrl('/projects'));
  }
}
