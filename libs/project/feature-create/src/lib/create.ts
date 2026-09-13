import { Component, inject } from '@angular/core';
import { CreateFacade } from '@jira/project-domain';
import { Button } from '@jira/ui-button';

@Component({
  selector: 'project-feature-create',
  imports: [Button],
  templateUrl: './create.html',
  styleUrl: './create.css',
  providers: [CreateFacade],
})
export class Create {
  facade = inject(CreateFacade);
}
