import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const caze = await prisma.case.findUnique({ where: { id: params.id } });
  if (!caze) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ case: caze });
}
