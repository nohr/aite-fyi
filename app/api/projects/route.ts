import { NextResponse } from "next/server";
import { getProjects } from "@lib/redis";

export interface ProjectType {
  title: string;
  description: string;
  desktop: string;
  mobile: string;
  url: string[];
  program: string[];
}

export async function GET() {
  const res = await getProjects();
  return NextResponse.json(res);
}
