import { parse } from "querystring";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { businessSlug: string; type: string } }
) {
  const businessSlug = params.businessSlug;
  const type = params.type;
  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        businessSlug,
        type,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      feedbacks,
    });
  } catch (error) {
    console.error("Error get feedbacks:", error);
    return Response.json(error);
  }
}
