import { Component, input } from '@angular/core';

@Component({
  selector: 'sprint-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly name = input('');
  readonly goal = input('');
  readonly range = input('');
  readonly state = input('future');
  readonly remainingDays = input(0);
}
