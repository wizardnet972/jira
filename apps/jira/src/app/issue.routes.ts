import { Route } from '@angular/router';

export const List = () => import('@jira/issue-feature-list').then((m) => m.List);
export const Create = () => import('@jira/issue-feature-create').then((m) => m.Create);
export const Detail = () => import('@jira/issue-feature-detail').then((m) => m.Detail);

export const issueRoutes: Route[] = [
  {
    path: 'issues',
    loadComponent: List,
  },
  {
    path: 'issues/create',
    loadComponent: Create,
  },
  {
    path: 'issues/:issueId',
    loadComponent: Detail,
  },
];
