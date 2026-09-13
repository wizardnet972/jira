import { Injectable, computed, inject } from '@angular/core';
import { formatSprintRange, remainingSprintDays } from '@jira/sprint-util-dates';
import { SprintsService } from '../infrastructure/sprints.service';

@Injectable()
export class ActiveFacade {
  #sprints = inject(SprintsService);

  sprint = this.#sprints.active;
  issues = computed(() => {
    const sprint = this.sprint();
    const users = this.#sprints.users();
    return this.#sprints
      .issues()
      .filter((issue) => issue.sprintId === sprint?.id)
      .map((issue) => ({
        ...issue,
        assignee: users.find((user) => user.id === issue.assigneeId) ?? null,
      }));
  });
  range = computed(() => {
    const sprint = this.sprint();
    return sprint ? formatSprintRange(sprint.startDate, sprint.endDate) : '';
  });
  remainingDays = computed(() => {
    const sprint = this.sprint();
    return sprint ? remainingSprintDays(sprint.endDate) : 0;
  });
}
