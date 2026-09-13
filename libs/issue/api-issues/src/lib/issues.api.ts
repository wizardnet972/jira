import { Injectable, inject } from '@angular/core';
import { CreateIssueInput, IssueStatus, JiraClient } from '@jira/util-data';

@Injectable({ providedIn: 'root' })
export class IssuesApi {
  #client = inject(JiraClient);

  list(projectId?: string) {
    return this.#client.listIssues(projectId ?? this.#client.currentProjectId());
  }

  get(issueId: string) {
    return this.#client.getIssue(issueId);
  }

  search(query: string) {
    return this.#client.searchIssues(query);
  }

  create(input: CreateIssueInput) {
    return this.#client.createIssue(input);
  }

  transition(issueId: string, status: IssueStatus) {
    return this.#client.transitionIssue(issueId, status);
  }
}
