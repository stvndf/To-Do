import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tasks = await prisma.task.findMany({orderBy: {id: "asc"}})

  res.status(200).send(tasks);
}
