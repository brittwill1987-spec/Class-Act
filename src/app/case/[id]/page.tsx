type Case = {
  id: string;
  title: string;
  companyOrBrand?: string | null;
  category?: string | null;
  claimDeadline?: string | null;
  eligibility?: string | null;
  benefitAmount?: string | null;
  howToFile?: string | null;
  officialClaimUrl?: string | null;
  sourceUrl: string;
};

async function getCase(id: string): Promise<Case> {
  const res = await fetch(`http://localhost:3000/api/cases/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Not found");
  const data = await res.json();
  return data.case;
}

export default async function CasePage({ params }: { params: { id: string } }) {
  const c = await getCase(params.id);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <a className="text-sm opacity-80 hover:underline" href="/">← Back</a>

      <h1 className="mt-3 text-2xl font-bold">{c.title}</h1>

      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-white/10 px-3 py-1">{c.claimDeadline ? `Deadline: ${c.claimDeadline}` : "Deadline: TBD"}</span>
        {c.benefitAmount ? <span className="rounded-full bg-white/10 px-3 py-1">{c.benefitAmount}</span> : null}
        {c.category ? <span className="rounded-full bg-white/10 px-3 py-1">{c.category}</span> : null}
      </div>

      <div className="mt-6 space-y-4 rounded-xl border border-white/10 bg-white/5 p-4">
        <div><strong>Company/Brand:</strong> {c.companyOrBrand ?? "—"}</div>
        <div><strong>Eligibility:</strong> {c.eligibility ?? "—"}</div>
        <div><strong>How to file:</strong> {c.howToFile ?? "—"}</div>

        <div className="flex flex-wrap gap-2 pt-2">
          <a className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black" href={`/apply/${c.id}`}>
            Easy Apply (Guided)
          </a>

          {c.officialClaimUrl ? (
            <a className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5" href={c.officialClaimUrl} target="_blank" rel="noreferrer">
              Official claim site
            </a>
          ) : null}

          <a className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5" href={c.sourceUrl} target="_blank" rel="noreferrer">
            Source
          </a>
        </div>

        <p className="text-xs opacity-70">
          Easy Apply generates your claim packet and guides submission. We do not auto-submit claims to third-party sites.
        </p>
      </div>
    </main>
  );
}
