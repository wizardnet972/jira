import { daysBetween, formatDate } from '@jira/util-dates';

export function formatSprintRange(startDate: string, endDate: string) {
  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}

export function remainingSprintDays(endDate: string) {
  return daysBetween(new Date().toISOString().slice(0, 10), endDate);
}
