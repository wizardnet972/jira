import { Component, input } from '@angular/core';

@Component({
  selector: 'project-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  readonly name = input('');
  readonly projectKey = input('');
  readonly description = input('');
  readonly type = input('software');
  readonly leadName = input('');
  readonly leadInitials = input('');
}
