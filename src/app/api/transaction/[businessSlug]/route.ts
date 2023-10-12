import prisma from "@/lib/prisma";

interface Transaction {
  id: number;
  createdAt: Date;
  businessSlug: string;
  paymentAmount: number;
  currency: string;
  paymentId: string;
  stripeSessionId: string;
}

interface TotalAmountOfTips {
  [currency: string]: number;
}

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
