import prisma from "@/lib/prisma";

export async function POST(req: Request, res: Response) {
  const { businessSlug, emoji, comment, tags, type } = await req.json();

  try {
    // Validate required fields
    if (
      emoji === undefined ||
      businessSlug === undefined ||
      type === undefined
    ) {
      return Response.json({ error: "Missing required fields" });
    }

    const response = await prisma.feedback.create({
      data: {
        businessSlug,
        emoji,
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
