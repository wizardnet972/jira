import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  readonly key = input('');
  readonly title = input('');
  readonly status = input('');
  readonly type = input('');
  readonly meta = input('');
  readonly assigneeName = input('');
}
