import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-empty-state',
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
  readonly title = input('Nothing here');
  readonly message = input('There is no work to show yet.');
}
