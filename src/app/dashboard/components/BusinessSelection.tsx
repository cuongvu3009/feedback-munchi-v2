"use client";

import React, { useEffect, useState } from "react";

import { getBusinessById } from "@/lib/getOneBusinessById";
import { useBusinessContext } from "@/context/BusinessContext";

interface BusinessProps {
  id: number;
  name: string;
}

interface BusinessSelectionProps {
  businesses: BusinessProps[];
}

const BusinessSelection: React.FC<BusinessSelectionProps> = ({
  businesses,
}) => {
  const [selectedBusiness, setSelectedBusiness] = useState<number | null>(null);
  const { setBusiness, setBusinessId } = useBusinessContext();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBusiness(Number(event.target.value));
  };

  useEffect(() => {
    if (selectedBusiness) {
      const fetchUserBusiness = async () => {
        const result = await getBusinessById(selectedBusiness);
        setBusiness(result);
        setBusinessId(result?.id);
      };

      fetchUserBusiness();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBusiness]);

  return (
    <div>
      <form>
        <select onChange={handleChange} value={selectedBusiness || ""}>
          {business?.name ? (
            <option value={business.id} disabled>
              {business.name}
            </option>
          ) : (
            <option value="" disabled>
              Select venues
            </option>
          )}

          {businesses.map((business: BusinessProps) => (
            <option key={business.id} value={business.id}>
              {business.name}
            </option>
          ))}
        </select>
        <br />
      </form>
    </div>
  );
};

export default BusinessSelection;
