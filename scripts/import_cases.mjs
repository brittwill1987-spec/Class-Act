import fs from "node:fs";
import path from "node:path";
import prismaPkg from "@prisma/client";

const { PrismaClient } = prismaPkg;
const prisma = new PrismaClient();

const home = process.env.HOME;
const casesPath = path.join(home, "classact", "data", "cases.json");
const db = JSON.parse(fs.readFileSync(casesPath, "utf8"));

const cases = db.cases || [];

for (const c of cases) {
  await prisma.case.upsert({
    where: { id: c.id },
    update: {
      title: c.title,
      companyOrBrand: c.company_or_brand ?? null,
      category: c.category ?? null,
      status: c.status ?? "open",
      claimDeadline: c.claim_deadline ?? null,
      eligibility: c.eligibility ?? null,
      benefitAmount: c.benefit_amount ?? null,
      howToFile: c.how_to_file ?? null,
      officialClaimUrl: c.official_claim_url ?? null,
      sourceUrl: c.source_url ?? "",
      lastVerifiedUtc: c.last_verified_utc ?? null,
      notes: c.notes ?? null,
    },
    create: {
      id: c.id,
      title: c.title,
      companyOrBrand: c.company_or_brand ?? null,
      category: c.category ?? null,
      status: c.status ?? "open",
      claimDeadline: c.claim_deadline ?? null,
      eligibility: c.eligibility ?? null,
      benefitAmount: c.benefit_amount ?? null,
      howToFile: c.how_to_file ?? null,
      officialClaimUrl: c.official_claim_url ?? null,
      sourceUrl: c.source_url ?? "",
      lastVerifiedUtc: c.last_verified_utc ?? null,
      notes: c.notes ?? null,
    },
  });
}

console.log("Imported:", cases.length);
await prisma.$disconnect();
