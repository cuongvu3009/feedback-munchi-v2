// Logo.tsx

import Image from "next/image";
import { RestaurantLogoProps } from "@/types/feedback.types";

const RestaurantLogo: React.FC<RestaurantLogoProps> = ({ restaurant }) => {
  return (
    <div className="logo-container">
      {restaurant && (
        <Image
          priority={true}
          src={restaurant?.logo}
          alt={restaurant?.name}
          className="logo"
          width={100}
          height={100}
        />
      )}

      <div className="restaurant-name">{restaurant?.name || ""}</div>
    </div>
  );
};

export default RestaurantLogo;
