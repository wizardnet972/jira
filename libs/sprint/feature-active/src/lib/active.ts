import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActiveFacade } from '@jira/sprint-domain';
import { Header } from '@jira/sprint-ui-header';
import { Card } from '@jira/ui-card';
import { EmptyState } from '@jira/ui-empty-state';

@Component({
  selector: 'sprint-feature-active',
  imports: [RouterLink, Header, Card, EmptyState],
  templateUrl: './active.html',
  styleUrl: './active.css',
  providers: [ActiveFacade],
})
export class Active {
  facade = inject(ActiveFacade);
}
