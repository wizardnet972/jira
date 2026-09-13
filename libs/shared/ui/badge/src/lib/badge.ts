import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-badge',
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class Badge {
  readonly label = input('');
  readonly tone = input<'neutral' | 'blue' | 'green' | 'orange' | 'red'>('neutral');
}
