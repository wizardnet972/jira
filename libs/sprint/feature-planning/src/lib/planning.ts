import { Component, inject } from '@angular/core';
import { PlanningFacade } from '@jira/sprint-domain';
import { Header } from '@jira/sprint-ui-header';
import { Button } from '@jira/ui-button';

@Component({
  selector: 'sprint-feature-planning',
  imports: [Header, Button],
  templateUrl: './planning.html',
  styleUrl: './planning.css',
  providers: [PlanningFacade],
})
export class Planning {
  facade = inject(PlanningFacade);
}
