import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { businessSlug: string; id: number } }
) {
  const businessSlug = params.businessSlug;
  const id = Number(params.id);

  try {
    const feedback = await prisma.feedback.findUnique({
      where: {
        businessSlug,
        id,
      },
    });

    if (feedback) {
      return Response.json({
        feedback,
      });
    } else {
      return Response.json({
        error: "Feedback not found",
      });
    }
  } catch (error) {
    console.error("Error get feedback:", error);
    return Response.json(error);
  }
}
