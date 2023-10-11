import { CheckoutOneTimePaymentBody } from "@/types/api.types";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = (await req.json()) as CheckoutOneTimePaymentBody;
  const origin = process.env.ORIGIN_URL;

  // Redirect URL after successful payment
  const success_url = `${origin}/feedback/thank-you/${body.businessSlug}?session_id={CHECKOUT_SESSION_ID}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment", // Change the mode to "payment" for one-time payments
      payment_method_types: ["card"], // Specify the payment method
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: body.amount, // The total amount in cents
            product_data: {
              name: body.businessSlug,
              description: body.paymentDescription,
            },
          },
          quantity: 1,
        },
      ],
      success_url: success_url,
    });

    return NextResponse.json(session);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}
