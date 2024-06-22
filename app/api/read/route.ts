import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient";

export async function GET(req: Request) {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}
