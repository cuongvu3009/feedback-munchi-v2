import { parse } from "querystring";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params, query }: { params: { businessSlug: string }; query: string }
) {
  const businessSlug = params.businessSlug;

  // Parse query parameters
  const { page, perPage } = parse(query);

  // Convert page and perPage to numbers (you may want to add validation)
  const currentPage = parseInt(page as string, 10) || 1;
  const itemsPerPage = parseInt(perPage as string, 10) || 5; // Default to 5 items each category per page

  try {
    const serviceFeedback = await prisma.feedback.findMany({
      where: {
        businessSlug,
        type: "SERVICE",
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    });

    const orderFeedback = await prisma.feedback.findMany({
      where: {
        businessSlug,
        type: "ORDER",
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    });

    return Response.json({
      serviceFeedback,
      orderFeedback,
    });
  } catch (error) {
    console.error("Error get feedbacks:", error);
    return Response.json(error);
  }
}
