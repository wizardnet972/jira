import { Injectable, computed, inject } from '@angular/core';
import { averageVelocity } from '@jira/sprint-util-velocity';
import { SprintsService } from '../infrastructure/sprints.service';

@Injectable()
export class ReportFacade {
  #sprints = inject(SprintsService);

  sprint = this.#sprints.active;
  stats = computed(() => {
    const sprint = this.sprint();
    const issues = this.#sprints.issues().filter((issue) => issue.sprintId === sprint?.id);
    const completed = issues.filter((issue) => issue.status === 'done').reduce((sum, issue) => sum + issue.storyPoints, 0);
    const committed = issues.reduce((sum, issue) => sum + issue.storyPoints, 0);
    const closedPoints = this.#sprints
      .sprints()
      .filter((item) => item.state === 'closed')
      .map((item) =>
        this.#sprints
          .issues()
          .filter((issue) => issue.sprintId === item.id && issue.status === 'done')
          .reduce((sum, issue) => sum + issue.storyPoints, 0)
      );
    return {
      remaining: committed - completed,
      completed,
      committed,
      velocity: averageVelocity(closedPoints.length ? closedPoints : [completed]),
    };
  });
}
