// app/lib/season.ts

export function getSeasonTheme(): string {
  const month = new Date().getMonth() + 1;

  if (month === 2) return "theme-mimosa";
  if (month === 3 || month === 4) return "theme-sakura";
  if (month === 5) return "theme-hanamizuki";
  return "theme-default";
}
