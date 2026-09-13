export function orderedColumns<T extends { status: string }>(columns: T[]) {
  const order = ['todo', 'in-progress', 'in-review', 'done'];
  return [...columns].sort((left, right) => order.indexOf(left.status) - order.indexOf(right.status));
}
