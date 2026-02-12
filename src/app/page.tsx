type Case = {
  id: string;
  title: string;
  companyOrBrand?: string | null;
  claimDeadline?: string | null;
  benefitAmount?: string | null;
  status: string;
};

async function getCases(): Promise<Case[]> {
  const res = await fetch("http://localhost:3000/api/cases", { cache: "no-store" });
  const data = await res.json();
  return data.cases ?? [];
}

export default async function Home() {
  const cases = await getCases();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Class Act</h1>
          <p className="mt-1 text-sm opacity-80">
            The “Indeed for Class Actions” — save, easy apply (guided), track.
          </p>
        </div>

        <div className="flex gap-2">
          <a className="rounded-lg border border-white/15 px-3 py-2 text-sm hover:bg-white/5" href="/login">Login</a>
          <a className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black" href="/dashboard">Dashboard</a>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {cases.map((c) => (
          <a
            key={c.id}
            href={`/case/${c.id}`}
            className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-base font-semibold">{c.title}</div>
              <div className="text-xs opacity-80">
                {c.claimDeadline ? `Deadline: ${c.claimDeadline}` : "Deadline: TBD"}
              </div>
            </div>

            <div className="mt-1 text-sm opacity-85">
              {c.companyOrBrand ? `Company: ${c.companyOrBrand}` : "Company: —"}
            </div>

            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-white/10 px-3 py-1">Status: {c.status}</span>
              {c.benefitAmount ? <span className="rounded-full bg-white/10 px-3 py-1">{c.benefitAmount}</span> : null}
              <span className="rounded-full bg-white/10 px-3 py-1">Easy Apply (Guided)</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
