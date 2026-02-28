// app/lib/season.ts

export function getSeasonTheme(): string {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  if (month === 2 || (month === 3 && day < 15)) return "theme-mimosa";
  if ((month === 3 && day >= 15) || month === 4) return "theme-sakura";
  if (month === 5) return "theme-hanamizuki";
  return "theme-default";
}
