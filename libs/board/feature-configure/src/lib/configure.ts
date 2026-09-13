import { Component, inject } from '@angular/core';
import { ConfigureFacade } from '@jira/board-domain';
import { Button } from '@jira/ui-button';

@Component({
  selector: 'board-feature-configure',
  imports: [Button],
  templateUrl: './configure.html',
  styleUrl: './configure.css',
  providers: [ConfigureFacade],
})
export class Configure {
  facade = inject(ConfigureFacade);
}
