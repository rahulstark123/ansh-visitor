export function PasswordRules({ pw }: { pw: string }) {
  const rules = [
    { label: "At least 8 characters", ok: pw.length >= 8 },
    { label: "One uppercase letter (A–Z)", ok: /[A-Z]/.test(pw) },
    { label: "One number (0–9)", ok: /[0-9]/.test(pw) },
    { label: "One special character", ok: /[^A-Za-z0-9]/.test(pw) },
  ];

  if (!pw) return null;

  return (
    <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
      {rules.map((r) => (
        <div
          key={r.label}
          className={`flex items-center gap-1.5 text-[10px] font-semibold transition-colors ${
            r.ok ? "text-emerald-600" : "text-slate-400"
          }`}
        >
          <span
            className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ${
              r.ok ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-300"
            }`}
          >
            {r.ok ? "✓" : "·"}
          </span>
          {r.label}
        </div>
      ))}
    </div>
  );
}
