"use client";

import { CheckoutOneTimePaymentBody } from "@/app/api/checkout-sessions/route";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

const OneTimePaymentCard = ({
  recipient,
  amount,
}: {
  recipient: string;
  amount: number;
}) => {
  const handleClick = async () => {
    // Step 1: Load Stripe
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    const stripe = await loadStripe(STRIPE_PK);

    // Step 2: Define the data for one-time payment
    const body: CheckoutOneTimePaymentBody = {
      paymentName: `Tip for ${recipient}`,
      paymentDescription: `Tip for ${recipient}: ${amount}€`,
      amount: amount * 100,
    };

    // Step 3: Make a POST fetch API call to /checkout-session handler
    const result = await fetch("/api/checkout-sessions", {
      method: "post",
      body: JSON.stringify(body, null),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(result);

    // Step 4: Get the data and redirect to checkout using the sessionId
    const data = (await result.json()) as Stripe.Checkout.Session;
    const sessionId = data.id!;
    stripe?.redirectToCheckout({ sessionId });
  };

  // Render a simple card
  return (
    <button onClick={() => handleClick()} className={`btn-full`}>
      Give Tip
    </button>
  );
};

export default OneTimePaymentCard;
