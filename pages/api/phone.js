import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Not signed in" });
  }

  if (req.method === "GET") {
    const record = await prisma.userPhone.findUnique({
      where: { userId }
    });
    res.json({ phone: record ? record.phone : "" });
  } else if (req.method === "POST") {
    const { phone } = req.body;
    await prisma.userPhone.upsert({
      where: { userId },
      update: { phone },
      create: { userId, phone }
    });
    res.json({ success: true });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
