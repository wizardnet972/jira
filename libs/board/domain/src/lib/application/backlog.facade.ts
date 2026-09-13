import { Injectable, computed, inject } from '@angular/core';
import { BoardService } from '../infrastructure/board.service';

@Injectable()
export class BacklogFacade {
  #board = inject(BoardService);

  project = this.#board.project;
  nextSprint = computed(() => this.#board.sprints().find((sprint) => sprint.state === 'future') ?? null);
  backlog = computed(() => {
    const sprints = this.#board.sprints();
    const users = this.#board.users();
    return this.#board
      .issues()
      .filter((issue) => !issue.sprintId || sprints.find((sprint) => sprint.id === issue.sprintId)?.state === 'future')
      .map((issue) => ({
        ...issue,
        assignee: users.find((user) => user.id === issue.assigneeId) ?? null,
      }));
  });

  plan(issueId: string) {
    const sprint = this.nextSprint();
    const active = this.#board.sprints().find((item) => item.state === 'active');
    this.#board.assignToSprint(issueId, sprint?.id ?? active?.id ?? null);
  }
}
