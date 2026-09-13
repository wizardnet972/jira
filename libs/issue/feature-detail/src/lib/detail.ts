import { Component, inject } from '@angular/core';
import { DetailFacade } from '@jira/issue-domain';
import { Status } from '@jira/issue-ui-status';
import { Avatar } from '@jira/ui-avatar';
import { Badge } from '@jira/ui-badge';
import { Button } from '@jira/ui-button';
import { EmptyState } from '@jira/ui-empty-state';

@Component({
  selector: 'issue-feature-detail',
  imports: [Status, Avatar, Badge, Button, EmptyState],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
  providers: [DetailFacade],
})
export class Detail {
  facade = inject(DetailFacade);
}
