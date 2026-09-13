import { Component, input } from '@angular/core';

@Component({
  selector: 'project-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly name = input('');
  readonly projectKey = input('');
  readonly description = input('');
}
