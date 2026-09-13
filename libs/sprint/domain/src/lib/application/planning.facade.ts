import { Injectable, computed, inject } from '@angular/core';
import { formatSprintRange } from '@jira/sprint-util-dates';
import { SprintsService } from '../infrastructure/sprints.service';

@Injectable()
export class PlanningFacade {
  #sprints = inject(SprintsService);

  sprints = computed(() =>
    this.#sprints.sprints().map((sprint) => ({
      ...sprint,
      range: formatSprintRange(sprint.startDate, sprint.endDate),
      points: this.#sprints
        .issues()
        .filter((issue) => issue.sprintId === sprint.id)
        .reduce((sum, issue) => sum + issue.storyPoints, 0),
    }))
  );

  start(sprintId: string) {
    this.#sprints.start(sprintId);
  }
}
