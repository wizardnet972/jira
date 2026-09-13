import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListFacade } from '@jira/project-domain';
import { Card } from '@jira/project-ui-card';
import { Button } from '@jira/ui-button';
import { EmptyState } from '@jira/ui-empty-state';

@Component({
  selector: 'project-feature-list',
  imports: [RouterLink, Card, Button, EmptyState],
  templateUrl: './list.html',
  styleUrl: './list.css',
  providers: [ListFacade],
})
export class List {
  facade = inject(ListFacade);
}
