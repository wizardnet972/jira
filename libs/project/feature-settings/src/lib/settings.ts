import { Component, inject } from '@angular/core';
import { SettingsFacade } from '@jira/project-domain';
import { Header } from '@jira/project-ui-header';
import { Button } from '@jira/ui-button';

@Component({
  selector: 'project-feature-settings',
  imports: [Header, Button],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
  providers: [SettingsFacade],
})
export class Settings {
  facade = inject(SettingsFacade);
}
