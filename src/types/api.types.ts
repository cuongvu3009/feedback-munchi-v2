export interface CheckoutOneTimePaymentBody {
  businessSlug: string;
  paymentDescription: string;
  amount: number;
}

export interface Transaction {
  id: number;
  createdAt: Date;
  businessSlug: string;
  paymentAmount: number;
  currency: string;
  paymentId: string;
  stripeSessionId: string;
}

export interface TotalAmountOfTips {
  [currency: string]: number;
}
