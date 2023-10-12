import { calculateTotalAmountOfTips } from "@/utils/calculateTotalAmountOfTips";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { businessSlug: string; type: string } }
) {
  const businessSlug = params.businessSlug;
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        businessSlug,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalAmountOfTips = calculateTotalAmountOfTips(transactions);

    return Response.json({
      transactions,
      totalAmountOfTips,
    });
  } catch (error) {
    console.error("Error get transaction:", error);
    return Response.json(error);
  }
}
