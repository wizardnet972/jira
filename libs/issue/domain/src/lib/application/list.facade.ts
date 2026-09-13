import { Injectable, computed, inject, signal } from '@angular/core';
import { priorityRank } from '@jira/issue-util-priority';
import { IssuesService } from '../infrastructure/issues.service';

@Injectable()
export class ListFacade {
  #issues = inject(IssuesService);
  query = signal('');

  issues = computed(() => {
    const term = this.query().trim().toLowerCase();
    const users = this.#issues.users();
    return this.#issues
      .issues()
      .filter((issue) => `${issue.key} ${issue.title}`.toLowerCase().includes(term))
      .sort((left, right) => priorityRank(right.priority) - priorityRank(left.priority))
      .map((issue) => ({
        ...issue,
        assignee: users.find((user) => user.id === issue.assigneeId) ?? null,
      }));
  });
}
