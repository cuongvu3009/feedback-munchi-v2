import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

interface TransactionProps {
  businessSlug: string;
  createdAt: number;
  paymentAmount: number;
  currency: string;
  paymentId: string;
  stripeSessionId: string;
}
// store transaction to database
export async function POST(
  req: Request,
  { params }: { params: { sessionId: string; businessSlug: string } }
) {
  try {
    const sessionId = params.sessionId;

    const transactions = await stripe.checkout.sessions.listLineItems(
      sessionId
    );
    const transactionData = transactions.data;

    const createdAt = transactionData[0].price?.created;
    const restaurantName = transactionData[0].description;
    const paymentAmount = transactionData[0].amount_total; //	in cents
    const currency = transactionData[0].currency;
    const paymentId = transactionData[0].id;

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
    });
    return Response.json(restaurantTransactions);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}
