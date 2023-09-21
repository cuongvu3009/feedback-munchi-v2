import { createContext, useContext, useEffect, useState } from "react";

export interface BusinessContextProps {
  businessId: number | undefined;
  setBusinessId: (value: number | undefined) => void;
}

const BusinessContext = createContext<BusinessContextProps>({
  businessId: undefined,
  setBusinessId: function (value: number | undefined): void {
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
  const [businessId, setBusinessIdState] = useState<number | undefined>(() => {
    // Retrieve the businessId from localStorage on component initialization
    const storedBusinessId = localStorage.getItem("businessId");
    return storedBusinessId ? parseInt(storedBusinessId, 10) : undefined;
  });

  // Use useEffect to store the businessId in localStorage whenever it changes
  useEffect(() => {
    if (businessId !== undefined) {
      localStorage.setItem("businessId", businessId.toString());
    } else {
      localStorage.removeItem("businessId");
    }
  }, [businessId]);

  const setBusinessId = (value: number | undefined) => {
    setBusinessIdState(value);
  };

  return (
    <BusinessContext.Provider
      value={{
        businessId,
        setBusinessId,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;
