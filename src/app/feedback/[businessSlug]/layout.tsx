"use client";

import "./feedback.css";

import { useEffect, useState } from "react";

import RestaurantLogo from "@/app/feedback/components/Logo";
import Title from "@/components/shared/Title";
import { getBusinessBySlug } from "@/lib/getOneBusinessBySlug";

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
      <div className="feedback-wrapper">
        {/* condition to prevent error Restaurant can be null */}
        {restaurant && <RestaurantLogo restaurant={restaurant} />}
        {children}
      </div>
    );
  }
}
