import prisma from "@/lib/prisma";

export async function POST(req: Request, res: Response) {
  const {
    businessSlug,
    score,
    comment,
    tags, // array of string
    type, // Use 'type' to classify if 'Service' or 'Order'
  } = await req.json();

  try {
    // Validate required fields
    if (
      score === undefined ||
      businessSlug === undefined ||
      type === undefined
    ) {
      return Response.json({ error: "Missing required fields" });
    }

    // Validate score and typeId
    if (score < 1 || score > 5 || type < 1 || type > 2) {
      return Response.json({ error: "Invalid score or typeId" });
    }

    const response = await prisma.feedback.create({
      data: {
        businessSlug,
        score,
        comment,
        tags,
        type,
      },
    });

    return Response.json(response); // Return the created feedback
  } catch (error) {
    console.error("Error creating feedback:", error);
    return Response.json(error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
}
