import { NextResponse } from "next/server";
import { getBio } from "@lib/redis";

type about = {
  name: string;
  title: string;
  bio: string;
};

export async function GET() {
  const res = (await getBio()) as about;
  return NextResponse.json(res.bio);
}
