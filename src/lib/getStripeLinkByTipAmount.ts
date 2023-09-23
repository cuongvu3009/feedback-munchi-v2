export const getLinkByTip = (tip: number): string => {
  switch (tip) {
    case 2:
      return "https://buy.stripe.com/test_5kA7sEbyd85gaeA8wE";
    case 3:
      return "https://buy.stripe.com/test_14keV60Tz0CO4UgeV3";
    case 5:
      return "https://buy.stripe.com/test_8wM6oA6dT0CO86sfZ8";
    default:
      return "https://buy.stripe.com/test_6oE7sE7hX0COgCY149"; // tip amount up to customer
  }
};
