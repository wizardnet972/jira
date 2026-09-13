import { Route } from '@angular/router';
import { boardRoutes } from './board.routes';
import { issueRoutes } from './issue.routes';
import { projectRoutes } from './project.routes';
import { sprintRoutes } from './sprint.routes';

export const Layout = () => import('@jira/shell-feature-layout').then((m) => m.Layout);

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: Layout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'board' },
      ...projectRoutes,
      ...issueRoutes,
      ...boardRoutes,
      ...sprintRoutes,
    ],
  },
];
