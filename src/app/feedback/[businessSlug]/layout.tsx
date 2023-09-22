"use client";

import { useEffect, useState } from "react";

import RestaurantLogo from "@/components/shared/Logo";
import Title from "@/components/shared/Title";
import TradeMark from "@/components/shared/TradeMark";
import { getBusinessBySlug } from "@/utils/getOneBusinessBySlug";
import styles from "./feedback.module.css";

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

export default function FeedbackLayout({
  params,
  children,
}: {
  params: { businessSlug: string };
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const restaurantData = await getBusinessBySlug(params.businessSlug);
        setRestaurant(restaurantData.result);
        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching data", error);
        setRestaurant(null);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.businessSlug]);

  if (isLoading && !restaurant) {
    return "feedback is loading...";
  } else {
    return (
      <div className="mobile">
        <div className={`${styles["feedback"]}`}>
          <Title />
          <div className={`${styles["feedback-wrapper"]}`}>
            {/* condition to prevent error Restaurant can be null */}
            {restaurant && <RestaurantLogo restaurant={restaurant} />}
          </div>
          {children}

          <div className="navigation">
            {/* <Button onClick={handleClick} version="full" btnText="Next" /> */}
            <TradeMark />
          </div>
        </div>
      </div>
    );
  }
}
