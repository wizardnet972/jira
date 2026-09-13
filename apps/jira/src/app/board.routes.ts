import { Route } from '@angular/router';

export const View = () => import('@jira/board-feature-view').then((m) => m.View);
export const Configure = () => import('@jira/board-feature-configure').then((m) => m.Configure);
export const Backlog = () => import('@jira/board-feature-backlog').then((m) => m.Backlog);

export const boardRoutes: Route[] = [
  {
    path: 'board',
    loadComponent: View,
  },
  {
    path: 'board/configure',
    loadComponent: Configure,
  },
  {
    path: 'backlog',
    loadComponent: Backlog,
  },
];
