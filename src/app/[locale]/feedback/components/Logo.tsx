// Logo.tsx

import Image from "next/image";

interface Restaurant {
  id: number;
  logo: string;
  slug: string;
  name: string;
  favorite: boolean;
  menus_count: number;
  available_menus_count: number;
  menus_shared_count: number;
  available_menus_shared_count: number;
  timezone: string;
  open: boolean;
  today: null | any;
  lazy_load_products_recommended: boolean;
  available_products_count: number;
  valid_service: boolean;
  maximum: null | any;
  header: null | any;
}
interface RestaurantLogoProps {
  restaurant: Restaurant | undefined;
}

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
