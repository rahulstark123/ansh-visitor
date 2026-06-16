import { ArrowUpRight } from "lucide-react";

const OUR_APPS = [
  {
    name: "ANSH Visitor",
    tagline: "Smart lobby & guest management",
    desc: "QR passes, ID verification, and check-in logs.",
    image: "/ANSH Visitor.jpg",
    href: "/",
    status: "Current",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/25",
  },
  {
    name: "ANSH Tasks",
    tagline: "Team task & project tracker",
    desc: "Assign, track, and close tasks across teams.",
    image: "/Ansh Task.jpg",
    href: "https://tasks.anshapps.com",
    status: "Live",
    badge: "bg-sky-500/10 text-sky-600 border-sky-500/25",
  },
  {
    name: "ANSH HR",
    tagline: "Human resource management",
    desc: "Employee records, leaves, attendance, and operations.",
    image: "/ANSH HR.jpg",
    href: "https://hr.anshapps.com",
    status: "Live",
    badge: "bg-violet-500/10 text-violet-600 border-violet-500/25",
  },
  {
    name: "ANSH Expense",
    tagline: "Expense & reimbursement tracking",
    desc: "Submit, approve, and audit business expenses.",
    image: "/ANSH Expense.jpg",
    href: "https://expense.anshapps.com",
    status: "Live",
    badge: "bg-orange-500/10 text-orange-600 border-orange-500/25",
  },
] as const;

export default function OurAppsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-widest text-primary">Ecosystem</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Ansh Apps</h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Explore the ANSH app suite for visitors, HR, tasks, and operations.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {OUR_APPS.map((app) => {
          const isInternal = app.href.startsWith("/");
          const card = (
            <article className="flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="relative h-40 w-full overflow-hidden border-b border-slate-200 dark:border-slate-800">
                <img src={app.image} alt={app.name} className="h-full w-full object-cover object-top" />
              </div>
              <div className="flex flex-1 flex-col space-y-3 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-black text-slate-900 dark:text-white">{app.name}</h2>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${app.badge}`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{app.tagline}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{app.desc}</p>
                <p
                  className={`mt-auto inline-flex items-center gap-1 text-xs font-bold ${
                    isInternal ? "text-transparent" : "text-primary"
                  }`}
                >
                  {!isInternal ? (
                    <>
                      Open App <ArrowUpRight className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    "Open App"
                  )}
                </p>
              </div>
            </article>
          );

          return isInternal ? (
            <a key={app.name} href={app.href} className="block">
              {card}
            </a>
          ) : (
            <a key={app.name} href={app.href} target="_blank" rel="noopener noreferrer" className="block">
              {card}
            </a>
          );
        })}
      </div>
    </div>
  );
}
