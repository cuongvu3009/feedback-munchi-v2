import { TotalAmountOfTips, Transaction } from "@/types/api.types";

import prisma from "@/lib/prisma";

function calculateTotalAmountOfTips(transactions: Transaction[]) {
  const totalAmountOfTips: TotalAmountOfTips = {};

  transactions.forEach((transaction) => {
    const currency = transaction.currency;
    const paymentAmount = transaction.paymentAmount;

    if (totalAmountOfTips[currency]) {
      totalAmountOfTips[currency] += paymentAmount;
    } else {
      totalAmountOfTips[currency] = paymentAmount;
    }
  });

  return totalAmountOfTips;
}

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
