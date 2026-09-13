import { Component, input } from '@angular/core';

@Component({
  selector: 'board-column',
  templateUrl: './column.html',
  styleUrl: './column.scss',
})
export class Column {
  readonly name = input('');
  readonly count = input(0);
  readonly wipLimit = input<number | null>(null);
  readonly overLimit = input(false);
}
