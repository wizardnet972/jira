import { Injectable, inject, linkedSignal } from '@angular/core';
import { ProjectsService } from '../infrastructure/projects.service';

@Injectable()
export class SettingsFacade {
  #projects = inject(ProjectsService);

  project = this.#projects.current;
  users = this.#projects.users;
  name = linkedSignal(() => this.project().name);
  description = linkedSignal(() => this.project().description);
  leadId = linkedSignal(() => this.project().leadId);

  save() {
    this.#projects.update(this.project().id, {
      name: this.name() || this.project().name,
      description: this.description() || this.project().description,
      leadId: this.leadId() || this.project().leadId,
    });
  }
}
