import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const taskId = Number(req.query.id);
    await prisma.task.delete({ where: { id: taskId } });

    res.status(204).send(null);
  } else {
    throw new Error("HTTP method unsupported in this route");
  }
}
