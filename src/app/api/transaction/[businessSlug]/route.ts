import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { businessSlug: string; type: string } }
) {
  const businessSlug = params.businessSlug;
  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        businessSlug,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      transaction,
    });
  } catch (error) {
    console.error("Error get transaction:", error);
    return Response.json(error);
  }
}
