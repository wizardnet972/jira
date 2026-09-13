const ranks = {
  lowest: 1,
  low: 2,
  medium: 3,
  high: 4,
  highest: 5,
} as const;

const labels = {
  lowest: 'Lowest',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  highest: 'Highest',
} as const;

export type PriorityName = keyof typeof ranks;

export function priorityRank(priority: PriorityName) {
  return ranks[priority];
}

export function priorityLabel(priority: PriorityName) {
  return labels[priority];
}
