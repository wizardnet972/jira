import { Injectable, computed, signal } from '@angular/core';
import { createId } from '@jira/util-id';
import {
  Board,
  BoardColumn,
  CreateIssueInput,
  CreateProjectInput,
  Issue,
  IssueStatus,
  Project,
  Sprint,
  User,
} from './models';

const users: User[] = [
  { id: 'u-maya', name: 'Maya Chen', initials: 'MC' },
  { id: 'u-omar', name: 'Omar Haddad', initials: 'OH' },
  { id: 'u-priya', name: 'Priya Shah', initials: 'PS' },
  { id: 'u-leo', name: 'Leo Okonkwo', initials: 'LO' },
];

@Injectable({ providedIn: 'root' })
export class JiraStore {
  #usersState = signal<User[]>(users);
  #projectsState = signal<Project[]>([
    {
      id: 'p-phoenix',
      key: 'PHX',
      name: 'Phoenix',
      description: 'Customer-facing issue tracker and delivery board.',
      type: 'software',
      leadId: 'u-maya',
    },
    {
      id: 'p-atlas',
      key: 'ATL',
      name: 'Atlas',
      description: 'Platform reliability and on-call operations.',
      type: 'software',
      leadId: 'u-omar',
    },
  ]);
  #issuesState = signal<Issue[]>([
    {
      id: 'i-1',
      key: 'PHX-12',
      title: 'Add board swimlanes by assignee',
      description: 'Product wants swimlanes so teams can scan their own work on the sprint board.',
      type: 'story',
      status: 'in-progress',
      priority: 'high',
      projectId: 'p-phoenix',
      sprintId: 's-15',
      assigneeId: 'u-priya',
      reporterId: 'u-maya',
      storyPoints: 5,
      createdAt: '2026-09-02T09:00:00.000Z',
    },
    {
      id: 'i-2',
      key: 'PHX-18',
      title: 'Issue detail loses description after refresh',
      description: 'Opening an issue, editing the description, then refreshing shows the previous text.',
      type: 'bug',
      status: 'todo',
      priority: 'highest',
      projectId: 'p-phoenix',
      sprintId: 's-15',
      assigneeId: 'u-leo',
      reporterId: 'u-omar',
      storyPoints: 3,
      createdAt: '2026-09-08T11:20:00.000Z',
    },
    {
      id: 'i-3',
      key: 'PHX-21',
      title: 'Create issue from the board header',
      description: 'A create action on the board should open the issue form with the current project preselected.',
      type: 'story',
      status: 'in-review',
      priority: 'medium',
      projectId: 'p-phoenix',
      sprintId: 's-15',
      assigneeId: 'u-maya',
      reporterId: 'u-maya',
      storyPoints: 2,
      createdAt: '2026-09-09T08:15:00.000Z',
    },
    {
      id: 'i-4',
      key: 'PHX-9',
      title: 'Sprint report shows completed points',
      description: 'Closed sprint reports should total completed story points and carry leftover work.',
      type: 'task',
      status: 'done',
      priority: 'medium',
      projectId: 'p-phoenix',
      sprintId: 's-14',
      assigneeId: 'u-omar',
      reporterId: 'u-maya',
      storyPoints: 3,
      createdAt: '2026-08-20T10:00:00.000Z',
    },
    {
      id: 'i-5',
      key: 'PHX-24',
      title: 'Filter backlog by issue type',
      description: 'Backlog needs type chips so the team can plan bugs separately from stories.',
      type: 'story',
      status: 'todo',
      priority: 'low',
      projectId: 'p-phoenix',
      sprintId: null,
      assigneeId: null,
      reporterId: 'u-priya',
      storyPoints: 2,
      createdAt: '2026-09-11T14:40:00.000Z',
    },
    {
      id: 'i-6',
      key: 'ATL-4',
      title: 'Page on-call rotation in Atlas',
      description: 'Operations needs a visible rotation for weekend coverage.',
      type: 'task',
      status: 'todo',
      priority: 'high',
      projectId: 'p-atlas',
      sprintId: null,
      assigneeId: 'u-omar',
      reporterId: 'u-leo',
      storyPoints: 1,
      createdAt: '2026-09-10T16:00:00.000Z',
    },
  ]);
  #boardsState = signal<Board[]>([
    { id: 'b-phx', name: 'Phoenix board', projectId: 'p-phoenix' },
    { id: 'b-atl', name: 'Atlas board', projectId: 'p-atlas' },
  ]);
  #columnsState = signal<BoardColumn[]>([
    { id: 'c-todo', name: 'To Do', status: 'todo', wipLimit: null },
    { id: 'c-progress', name: 'In Progress', status: 'in-progress', wipLimit: 3 },
    { id: 'c-review', name: 'In Review', status: 'in-review', wipLimit: 2 },
    { id: 'c-done', name: 'Done', status: 'done', wipLimit: null },
  ]);
  #sprintsState = signal<Sprint[]>([
    {
      id: 's-14',
      name: 'Sprint 14',
      projectId: 'p-phoenix',
      state: 'closed',
      goal: 'Ship sprint reporting.',
      startDate: '2026-08-18',
      endDate: '2026-08-31',
    },
    {
      id: 's-15',
      name: 'Sprint 15',
      projectId: 'p-phoenix',
      state: 'active',
      goal: 'Make the board the daily working surface.',
      startDate: '2026-09-01',
      endDate: '2026-09-14',
    },
    {
      id: 's-16',
      name: 'Sprint 16',
      projectId: 'p-phoenix',
      state: 'future',
      goal: 'Harden backlog planning.',
      startDate: '2026-09-15',
      endDate: '2026-09-28',
    },
  ]);
  #currentProjectIdState = signal('p-phoenix');

  readonly users = this.#usersState.asReadonly();
  readonly projects = this.#projectsState.asReadonly();
  readonly issues = this.#issuesState.asReadonly();
  readonly boards = this.#boardsState.asReadonly();
  readonly columns = this.#columnsState.asReadonly();
  readonly sprints = this.#sprintsState.asReadonly();
  readonly currentProjectId = this.#currentProjectIdState.asReadonly();

  readonly currentProject = computed(
    () => this.#projectsState().find((project) => project.id === this.#currentProjectIdState()) ?? this.#projectsState()[0]
  );

  userById(id: string | null | undefined) {
    return this.#usersState().find((user) => user.id === id) ?? null;
  }

  selectProject(projectId: string) {
    this.#currentProjectIdState.set(projectId);
  }

  createProject(input: CreateProjectInput) {
    const project: Project = {
      id: createId('p'),
      key: (input.key || input.name).toUpperCase().replace(/[^A-Z0-9]+/g, '').slice(0, 5) || 'PRJ',
      name: input.name.trim(),
      description: input.description.trim(),
      type: input.type,
      leadId: this.#usersState()[0].id,
    };
    this.#projectsState.update((projects) => [...projects, project]);
    this.#boardsState.update((boards) => [...boards, { id: createId('b'), name: `${project.name} board`, projectId: project.id }]);
    this.#currentProjectIdState.set(project.id);
    return project;
  }

  updateProject(projectId: string, patch: Partial<Pick<Project, 'name' | 'description' | 'leadId'>>) {
    this.#projectsState.update((projects) =>
      projects.map((project) => (project.id === projectId ? { ...project, ...patch } : project))
    );
  }

  createIssue(input: CreateIssueInput) {
    const project = this.#projectsState().find((item) => item.id === input.projectId) ?? this.currentProject();
    const count = this.#issuesState().filter((issue) => issue.projectId === project.id).length + 1;
    const issue: Issue = {
      id: createId('i'),
      key: `${project.key}-${count}`,
      title: input.title.trim(),
      description: input.description.trim(),
      type: input.type,
      status: 'todo',
      priority: input.priority,
      projectId: project.id,
      sprintId: this.activeSprint(project.id)?.id ?? null,
      assigneeId: input.assigneeId,
      reporterId: this.#usersState()[0].id,
      storyPoints: input.storyPoints,
      createdAt: new Date().toISOString(),
    };
    this.#issuesState.update((issues) => [issue, ...issues]);
    return issue;
  }

  updateIssueStatus(issueId: string, status: IssueStatus) {
    this.#issuesState.update((issues) => issues.map((issue) => (issue.id === issueId ? { ...issue, status } : issue)));
  }

  assignIssueToSprint(issueId: string, sprintId: string | null) {
    this.#issuesState.update((issues) => issues.map((issue) => (issue.id === issueId ? { ...issue, sprintId } : issue)));
  }

  updateColumnWip(columnId: string, wipLimit: number | null) {
    this.#columnsState.update((columns) =>
      columns.map((column) => (column.id === columnId ? { ...column, wipLimit } : column))
    );
  }

  startSprint(sprintId: string) {
    const sprint = this.#sprintsState().find((item) => item.id === sprintId);
    if (!sprint) {
      return;
    }
    this.#sprintsState.update((sprints) =>
      sprints.map((item) => {
        if (item.id === sprintId) {
          return { ...item, state: 'active' };
        }
        if (item.projectId === sprint.projectId && item.state === 'active') {
          return { ...item, state: 'closed' };
        }
        return item;
      })
    );
  }

  issuesForProject(projectId: string) {
    return this.#issuesState().filter((issue) => issue.projectId === projectId);
  }

  activeSprint(projectId: string) {
    return this.#sprintsState().find((sprint) => sprint.projectId === projectId && sprint.state === 'active') ?? null;
  }
}
