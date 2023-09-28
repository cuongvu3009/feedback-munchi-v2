import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export async function GET(
  req: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const transactions = await stripe.checkout.sessions.listLineItems(
      params.sessionId
    );
    return Response.json(transactions);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}
