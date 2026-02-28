import { getCalendar } from "@/app/lib/microcms";

type Props = {
  year: number;
  month: number;
  size?: "sm" | "lg";
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default async function Calendar({ year, month, size = "sm" }: Props) {
  const data = await getCalendar(year, month);
  const businessDays = data
    ? data.businessDays.split(",").map((d) => parseInt(d.trim()))
    : [];

  const firstDay = new Date(year, month - 1, 1).getDay();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isLg = size === "lg";

  return (
    <>
      {/* SVGフィルター定義 */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="chalk">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>
      </svg>
      <div
        className={`relative overflow-hidden ${
          isLg ? "p-6" : "p-3"
        } w-full shadow-md`}
        style={{
          backgroundColor: "#2d4a3e",
        }}
      >
        {/* ザラザラオーバーレイだけ黒板内に */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
            opacity: 0.6,
            mixBlendMode: "overlay",
          }}
        />

        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-4">
          <h2
            className={`font-bold text-white/90 ${
              isLg ? "text-xl" : "text-sm"
            }`}
          >
            {MONTHS[month - 1]} {year}
          </h2>
          {!data && <span className="text-xs text-white/40">Not set</span>}
        </div>

        {/* 曜日ヘッダー */}
        <div className="grid grid-cols-7 mb-1">
          {WEEKDAYS.map((day, i) => (
            <div
              key={day}
              className={`text-center font-medium py-1 ${
                isLg ? "text-xs" : "text-[10px]"
              } ${
                i === 5
                  ? "text-blue-300"
                  : i === 6
                  ? "text-red-300"
                  : "text-white/60"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* 日付グリッド */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((day, i) => {
            const col = i % 7;
            const isSat = col === 5;
            const isSun = col === 6;
            const isBusinessDay = day !== null && businessDays.includes(day);
            const isToday =
              day !== null &&
              new Date().getFullYear() === year &&
              new Date().getMonth() + 1 === month &&
              new Date().getDate() === day;

            return (
              <div
                key={i}
                className={`
                  flex items-center justify-center rounded-lg
                  ${isLg ? "h-10 text-sm" : "h-6 text-[11px]"}
                  ${
                    !day
                      ? ""
                      : isBusinessDay
                      ? "bg-teal-400/30 text-teal-200 font-bold"
                      : isSat
                      ? "text-blue-300"
                      : isSun
                      ? "text-red-300"
                      : "text-white/80"
                  }
                  ${isToday ? "ring-2 ring-white/60" : ""}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* 凡例 */}
        <div className="mt-3 flex items-center gap-2">
          <div
            className={`rounded bg-teal-400/30 ${isLg ? "w-4 h-4" : "w-3 h-3"}`}
          />
          <span className={`text-white/60 ${isLg ? "text-xs" : "text-[10px]"}`}>
            Open
          </span>
        </div>
      </div>
    </>
  );
}
