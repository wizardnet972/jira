import { Injectable, computed, inject } from '@angular/core';
import { IssueStatus, nextIssueStatus } from '@jira/util-data';
import { orderedColumns } from '@jira/board-util-layout';
import { isWipExceeded } from '@jira/board-util-wip';
import { BoardService } from '../infrastructure/board.service';

@Injectable()
export class ViewFacade {
  #board = inject(BoardService);

  project = this.#board.project;
  board = computed(
    () => this.#board.boards()[0] ?? { id: '', name: 'Board', projectId: this.project().id }
  );
  columns = computed(() => {
    const activeSprint = this.#board.sprints().find((sprint) => sprint.state === 'active');
    const users = this.#board.users();
    const issues = this.#board.issues().filter((issue) => issue.sprintId === activeSprint?.id);
    return orderedColumns(this.#board.columns()).map((column) => {
      const cards = issues
        .filter((issue) => issue.status === column.status)
        .map((issue) => ({
          ...issue,
          assignee: users.find((user) => user.id === issue.assigneeId) ?? null,
        }));
      return {
        ...column,
        cards,
        nextStatus: nextIssueStatus(column.status),
        overLimit: isWipExceeded(cards.length, column.wipLimit),
      };
    });
  });

  move(issueId: string, status: IssueStatus) {
    this.#board.move(issueId, status);
  }
}
