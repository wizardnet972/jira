import { Component, inject } from '@angular/core';
import { ReportFacade } from '@jira/sprint-domain';
import { Header } from '@jira/sprint-ui-header';
import { Burndown } from '@jira/sprint-ui-burndown';
import { EmptyState } from '@jira/ui-empty-state';
import { Badge } from '@jira/ui-badge';

@Component({
  selector: 'sprint-feature-report',
  imports: [Header, Burndown, EmptyState, Badge],
  templateUrl: './report.html',
  styleUrl: './report.css',
  providers: [ReportFacade],
})
export class Report {
  facade = inject(ReportFacade);
}
