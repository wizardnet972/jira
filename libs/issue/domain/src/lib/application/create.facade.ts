import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IssueType, Priority } from '@jira/util-data';
import { IssuesService } from '../infrastructure/issues.service';

@Injectable()
export class CreateFacade {
  #issues = inject(IssuesService);
  #router = inject(Router);
  title = signal('');
  description = signal('');
  type = signal<IssueType>('story');
  priority = signal<Priority>('medium');
  assigneeId = signal<string | null>(null);
  storyPoints = signal(1);

  users = this.#issues.users;
  project = this.#issues.project;

  save() {
    if (!this.title().trim()) {
      return;
    }
    void this.#issues
      .create({
        title: this.title(),
        description: this.description(),
        type: this.type(),
        priority: this.priority(),
        projectId: this.project().id,
        assigneeId: this.assigneeId(),
        storyPoints: this.storyPoints(),
      })
      .then((issue) => this.#router.navigate(['/issues', issue.id]));
  }
}
