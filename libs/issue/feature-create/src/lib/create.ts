import { Component, inject } from '@angular/core';
import { CreateFacade } from '@jira/issue-domain';
import { Button } from '@jira/ui-button';

@Component({
  selector: 'issue-feature-create',
  imports: [Button],
  templateUrl: './create.html',
  styleUrl: './create.css',
  providers: [CreateFacade],
})
export class Create {
  facade = inject(CreateFacade);
}
