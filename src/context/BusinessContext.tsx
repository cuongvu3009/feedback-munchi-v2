import { createContext, useContext } from "react";

import { BusinessProps } from "@/types/dashboard.types";
import { usePersistState } from "@/hooks/usePersistState";

export interface BusinessContextProps {
  businessId: number | undefined;
  setBusinessId: (value: number | undefined) => void;
  business: BusinessProps | undefined;
  setBusiness: (value: BusinessProps | undefined) => void;
}

const BusinessContext = createContext<BusinessContextProps>({
  businessId: undefined,
  setBusinessId: function (value: number | undefined): void {
    throw new Error("Function not implemented.");
  },
  business: undefined,
  setBusiness: function (value: BusinessProps | undefined): void {
    throw new Error("Function not implemented.");
  },
});

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
};

export const BusinessProvider = ({ children }: any) => {
  const [businessId, setBusinessId] = usePersistState("businessId", undefined);
  const [business, setBusiness] = usePersistState("business", undefined);

  return (
    <BusinessContext.Provider
      value={{
        businessId,
        setBusinessId,
        business,
        setBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;
