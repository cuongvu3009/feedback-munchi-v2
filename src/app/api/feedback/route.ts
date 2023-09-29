import prisma from "@/lib/prisma";

export async function POST(req: Request, res: Response) {
  const payloads = await req.json();

  try {
    // Validate required fields for each payload
    for (const payload of payloads) {
      const { emoji, businessSlug, type } = payload;

      if (
        emoji === undefined ||
        businessSlug === undefined ||
        type === undefined
      ) {
        return Response.json({ error: "Missing required fields" });
      }

      // Create a feedback record for each payload
      await prisma.feedback.create({
        data: payload,
      });
    }

    return Response.json({ message: "Feedback created successfully" });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return Response.json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Disconnect from the Prisma client
  }
}

export async function GET(req: Request) {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return Response.json(feedbacks);
  } catch (error) {
    console.error("Error get feedbacks:", error);
    return Response.json(error);
  }
}
