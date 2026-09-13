import { Component, input, output } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly label = input('Button');
  readonly variant = input<'primary' | 'subtle' | 'danger'>('primary');
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false);
  readonly pressed = output<void>();
}
