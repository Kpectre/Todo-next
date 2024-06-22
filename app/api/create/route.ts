import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient";

export async function POST(req: Request) {
  const { task } = await req.json();
  const data = await prisma.task.create({
    data: {
      task,
    },
  });
  return NextResponse.json(data);
}
