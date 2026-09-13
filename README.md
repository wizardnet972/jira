# Jira

Angular Nx monorepo for a Jira-style delivery app. Libraries are generated with `nx-domainify` and follow DDD module-boundary tags.

## Run

```sh
pnpm exec nx serve jira
```

Open http://localhost:4200 (or the port printed by the dev server).

## Domains

| Domain | Features | API | UI | Utils |
| --- | --- | --- | --- | --- |
| project | list, create, settings | — | card, header | key, filters |
| issue | list, detail, create | issues | card, status | key, priority |
| board | view, configure, backlog | — | column | layout, wip |
| sprint | active, planning, report | — | header, burndown | dates, velocity |

Shared is only UI and utils (`button`, `avatar`, `badge`, `empty-state`, `dates`, `format`, `id`, `query-params`, `data`). There is no `shared` domain.
