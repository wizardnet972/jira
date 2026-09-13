import { Component, input } from '@angular/core';

@Component({
  selector: 'sprint-burndown',
  templateUrl: './burndown.html',
  styleUrl: './burndown.scss',
})
export class Burndown {
  readonly remaining = input(0);
  readonly completed = input(0);
  readonly committed = input(0);
}
