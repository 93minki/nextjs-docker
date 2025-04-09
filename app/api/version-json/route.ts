import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "outer-version.json");
  try {
    console.log("bye!");
    console.log("bye!");
    console.log("bye!");
    console.log("bye!");
    const data = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(data);
    return NextResponse.json(parsed);
  } catch (error) {
    console.log("bye!");
    console.log("bye!");
    console.log("bye!");
    console.log("bye!");
    return NextResponse.json(
      { error: `${error} Version file not found or invalid` },
      { status: 500 }
    );
  }
}
