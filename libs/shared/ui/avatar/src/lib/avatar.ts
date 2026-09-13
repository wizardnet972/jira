import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  readonly initials = input('NA');
  readonly name = input('');
}
