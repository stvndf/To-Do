import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const taskId = Number(req.query.id);
    const { newIsComplete } = req.body;
    const result = await prisma.task.update({
      where: { id: taskId },
      data: { isComplete: newIsComplete },
    });

    res.status(201).json(result);
  } else {
    throw new Error("HTTP method unsupported in this route");
  }
}
