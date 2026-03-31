// config/design.ts
export const designConfig = {
  header: {
    pattern: "bg-pattern-diagonal-dots",
    // "bg-pattern-diagonal-dots"
    // "bg-pattern-dots"
    // "bg-pattern-stripes"
  },
  footer: {
    bg: "bg-footer", // ← カスタムクラスに変更
    pattern: "bg-pattern-dots-white", // ← 追加
  },
} as const;
