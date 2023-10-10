import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

// store transaction to database
export async function POST(
  req: Request,
  { params }: { params: { sessionId: string; businessSlug: string } }
) {
  try {
    const sessionId = params.sessionId;

    //	get transaction data from stripe using sessionId
    const transactions = await stripe.checkout.sessions.listLineItems(
      sessionId
    );
    const transactionData = transactions.data;

    // Check if required fields are present in transactionData
    if (!transactionData[0]) {
      return Response.json({ message: "Transaction data is missing" });
    }

    const createdAt = transactionData[0].price?.created;
    const restaurantName = transactionData[0].description;
    const paymentAmount = transactionData[0].amount_total; //	in cents
    const currency = transactionData[0].currency;
    const paymentId = transactionData[0].id;

    // Check if a transaction with the same paymentId or stripeSessionId already exists
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        OR: [
          { paymentId: paymentId }, // Assuming paymentId is unique
          { stripeSessionId: sessionId }, // Assuming sessionId is unique
        ],
      },
    });

    // If an existing transaction is found, return an error response
    if (existingTransaction) {
      return Response.json({ message: "Transaction already exists" });
    }

    const createdTransaction = await prisma.transaction.create({
      data: {
        createdAt: new Date(createdAt! * 1000), // Convert Unix timestamp to Date
        businessSlug: restaurantName,
        paymentAmount: paymentAmount, // Convert 'paymentAmount' to a BigInt
        currency,
        paymentId,
        stripeSessionId: sessionId,
      },
    });

    return Response.json(createdTransaction);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sessionId: string; businessSlug: string } }
) {
  try {
    const sessionId = params.sessionId;
    const businessSlug = params.businessSlug;
    const restaurantTransactions = prisma.transaction.findMany({
      where: { businessSlug },
      orderBy: {
        createdAt: "desc",
      },
    });
    return Response.json(restaurantTransactions);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}
