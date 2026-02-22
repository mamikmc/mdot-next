// config/design.ts
export const designConfig = {
  header: {
    pattern: "bg-pattern-diagonal-dots",
    // "bg-pattern-diagonal-dots"
    // "bg-pattern-dots"
    // "bg-pattern-stripes"
  },
  footer: {
    bg: "bg-rose-400",
    pattern: "bg-pattern-dots-white", // ← 追加
  },
} as const;
