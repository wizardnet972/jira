import { Component, input } from '@angular/core';
import { titleCase } from '@jira/util-format';

@Component({
  selector: 'issue-status',
  templateUrl: './status.html',
  styleUrl: './status.scss',
})
export class Status {
  readonly status = input('todo');
  protected readonly titleCase = titleCase;
}
