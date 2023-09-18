import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { businessSlug: any } }
) {
  const businessSlug = params.businessSlug;
  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        businessSlug,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return Response.json(feedbacks);
  } catch (error) {
    console.error("Error get feedbacks:", error);
    return Response.json(error);
  }
}
