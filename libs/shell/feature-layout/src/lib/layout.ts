import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LayoutFacade } from '@jira/shell-domain';
import { Avatar } from '@jira/ui-avatar';
import { Button } from '@jira/ui-button';
import { Icon } from '@jira/ui-icon';

@Component({
  selector: 'shell-feature-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Button, Avatar, Icon],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  providers: [LayoutFacade],
})
export class Layout {
  facade = inject(LayoutFacade);
}
