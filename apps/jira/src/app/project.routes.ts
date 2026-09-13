import { Route } from '@angular/router';

export const List = () => import('@jira/project-feature-list').then((m) => m.List);
export const Create = () => import('@jira/project-feature-create').then((m) => m.Create);
export const Settings = () => import('@jira/project-feature-settings').then((m) => m.Settings);

export const projectRoutes: Route[] = [
  {
    path: 'projects',
    loadComponent: List,
  },
  {
    path: 'projects/create',
    loadComponent: Create,
  },
  {
    path: 'projects/settings',
    loadComponent: Settings,
  },
];
