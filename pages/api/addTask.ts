import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const newTask = req.body;

    const result = await prisma.task.create({
      data: { content: newTask },
    });

    res.status(201).json(result);
  } else {
    throw new Error("HTTP method unsupported in this route");
  }
}
