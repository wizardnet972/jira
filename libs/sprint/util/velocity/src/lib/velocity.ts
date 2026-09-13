export function averageVelocity(completedPoints: number[]) {
  if (!completedPoints.length) {
    return 0;
  }
  return Math.round(completedPoints.reduce((sum, points) => sum + points, 0) / completedPoints.length);
}
