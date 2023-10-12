import { TotalAmountOfTips, Transaction } from "@/types/api.types";

export const calculateTotalAmountOfTips = (transactions: Transaction[]) => {
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
};
