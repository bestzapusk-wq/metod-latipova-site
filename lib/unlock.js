const DAYS_PER_REWARD = 30;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function calcUnlockedMonths(startedAt, now = Date.now()) {
  const startMs = new Date(startedAt).getTime();
  if (Number.isNaN(startMs)) return 0;

  const elapsedMs = now - startMs;
  if (elapsedMs < DAYS_PER_REWARD * MS_PER_DAY) return 0;

  const periods = Math.floor(elapsedMs / (DAYS_PER_REWARD * MS_PER_DAY));
  return Math.min(12, periods);
}
