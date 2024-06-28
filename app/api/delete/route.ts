import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient";

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const data = await prisma.task.delete({
    where: {
      id,
    },
  });
  return NextResponse.json(data);
}
