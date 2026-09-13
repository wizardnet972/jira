import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { ISSUE_STATUSES, IssueStatus, jiraKeys } from '@jira/util-data';
import { formatDate } from '@jira/util-dates';
import { map } from 'rxjs';
import { IssuesService } from '../infrastructure/issues.service';

@Injectable()
export class DetailFacade {
  #issues = inject(IssuesService);
  #route = inject(ActivatedRoute);
  statuses = ISSUE_STATUSES;

  #issueId = toSignal(
    this.#route.paramMap.pipe(map((params) => params.get('issueId') ?? '')),
    { initialValue: this.#route.snapshot.paramMap.get('issueId') ?? '' }
  );

  #issueQuery = injectQuery(() => ({
    queryKey: jiraKeys.issue(this.#issueId()),
    queryFn: () => this.#issues.issue(this.#issueId()),
    enabled: !!this.#issueId(),
  }));

  issue = computed(() => this.#issueQuery.data() ?? null);
  assignee = computed(() => this.#issues.users().find((user) => user.id === this.issue()?.assigneeId) ?? null);
  reporter = computed(() => this.#issues.users().find((user) => user.id === this.issue()?.reporterId) ?? null);
  createdOn = computed(() => {
    const issue = this.issue();
    return issue ? formatDate(issue.createdAt) : '';
  });

  move(status: IssueStatus) {
    const issue = this.issue();
    if (issue) {
      this.#issues.move(issue.id, status);
    }
  }
}
