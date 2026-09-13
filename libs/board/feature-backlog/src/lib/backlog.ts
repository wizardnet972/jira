import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BacklogFacade } from '@jira/board-domain';
import { Button } from '@jira/ui-button';
import { Card } from '@jira/ui-card';
import { EmptyState } from '@jira/ui-empty-state';

@Component({
  selector: 'board-feature-backlog',
  imports: [RouterLink, Card, Button, EmptyState],
  templateUrl: './backlog.html',
  styleUrl: './backlog.css',
  providers: [BacklogFacade],
})
export class Backlog {
  facade = inject(BacklogFacade);
}
