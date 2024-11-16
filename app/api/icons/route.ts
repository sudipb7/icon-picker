import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "10");

  const iconsDirectory = path.join(process.cwd(), "public/icons");
  const files = fs.readdirSync(iconsDirectory);

  const start = (page - 1) * perPage;
  const end = start + perPage;

  return NextResponse.json({
    total: files.length,
    icons: files.slice(start, end),
  });
}
