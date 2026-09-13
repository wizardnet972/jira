import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListFacade } from '@jira/issue-domain';
import { Card } from '@jira/issue-ui-card';
import { Button } from '@jira/ui-button';
import { EmptyState } from '@jira/ui-empty-state';

@Component({
  selector: 'issue-feature-list',
  imports: [RouterLink, Card, Button, EmptyState],
  templateUrl: './list.html',
  styleUrl: './list.css',
  providers: [ListFacade],
})
export class List {
  facade = inject(ListFacade);
}
