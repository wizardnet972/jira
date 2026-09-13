import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewFacade } from '@jira/board-domain';
import { Column } from '@jira/board-ui-column';
import { Button } from '@jira/ui-button';
import { Card } from '@jira/ui-card';

@Component({
  selector: 'board-feature-view',
  imports: [RouterLink, Column, Card, Button],
  templateUrl: './view.html',
  styleUrl: './view.css',
  providers: [ViewFacade],
})
export class View {
  facade = inject(ViewFacade);
}
