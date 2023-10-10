import { type NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { businessSlug: string } }
) {
  const businessSlug = params.businessSlug;
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page") || 1;
  const itemsPerPage = searchParams.get("itemsPerPage") || 10; // Default to 10 items per page if not provided

  const skip = (+page - 1) * +itemsPerPage;

  try {
    const allFeedbacks = await prisma.feedback.findMany({
      where: {
        businessSlug,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const feedbacks = await prisma.feedback.findMany({
      where: {
        businessSlug,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip, // Skip the appropriate number of items based on the page number
      take: +itemsPerPage, // Limit the result to the specified number of items per page
    });

    return Response.json({
      feedbacks,
      allFeedbacksCount: allFeedbacks.length,
    });
  } catch (error) {
    console.error("Error get feedbacks:", error);
    return Response.json(error);
  }
}
