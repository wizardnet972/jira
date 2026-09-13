import { Route } from '@angular/router';

export const Active = () => import('@jira/sprint-feature-active').then((m) => m.Active);
export const Planning = () => import('@jira/sprint-feature-planning').then((m) => m.Planning);
export const Report = () => import('@jira/sprint-feature-report').then((m) => m.Report);

export const sprintRoutes: Route[] = [
  {
    path: 'sprints',
    loadComponent: Active,
  },
  {
    path: 'sprints/planning',
    loadComponent: Planning,
  },
  {
    path: 'sprints/report',
    loadComponent: Report,
  },
];
