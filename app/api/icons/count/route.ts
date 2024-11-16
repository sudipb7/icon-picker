import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET() {
  const iconsDirectory = path.join(process.cwd(), "public/icons");
  const files = fs.readdirSync(iconsDirectory);

  return NextResponse.json({
    count: files.length,
  });
}
