export function getPasswordStrength(pw: string): {
  score: number;
  label: string;
  color: string;
  bars: string[];
} {
  if (!pw) return { score: 0, label: "", color: "", bars: Array(4).fill("bg-slate-200") };

  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const map = [
    { label: "Too weak", color: "text-rose-500" },
    { label: "Weak", color: "text-orange-500" },
    { label: "Fair", color: "text-amber-500" },
    { label: "Strong", color: "text-emerald-500" },
    { label: "Very strong", color: "text-emerald-600" },
  ];

  const barColors = [
    "bg-slate-200 dark:bg-slate-700",
    "bg-rose-400",
    "bg-orange-400",
    "bg-amber-400",
    "bg-emerald-400",
  ];

  const bars = Array(4)
    .fill("")
    .map((_, i) => (i < score ? barColors[score] : "bg-slate-200 dark:bg-slate-700"));

  return { score, label: map[score].label, color: map[score].color, bars };
}

export function isPasswordStrongEnough(pw: string): boolean {
  return getPasswordStrength(pw).score >= 2;
}
