export function filterProjects<T extends { name: string; key: string }>(projects: T[], query: string) {
  const term = query.trim().toLowerCase();
  if (!term) {
    return projects;
  }
  return projects.filter((project) => `${project.key} ${project.name}`.toLowerCase().includes(term));
}
