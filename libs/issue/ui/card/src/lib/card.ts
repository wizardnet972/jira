import { Component, input } from '@angular/core';
import { priorityLabel } from '@jira/issue-util-priority';

@Component({
  selector: 'issue-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  readonly issueKey = input('');
  readonly title = input('');
  readonly type = input('task');
  readonly status = input('todo');
  readonly priority = input('medium');
  readonly assigneeName = input('');
  readonly points = input(0);
  protected readonly priorityLabel = priorityLabel;
}
