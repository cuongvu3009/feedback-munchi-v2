"use client";

import { Feedback, FeedbackContextProps } from "../types/feedback.types";
import { createContext, useContext, useEffect, useState } from "react";

import { API_BASE_URL } from "../utils/constantAPI";
import axios from "axios";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface UserData {
  address: string;
  address_notes: string | null;
  available: boolean;
  bio: string | null;
  birthdate: string | null;
  business_id: number | null;
  busy: boolean;
  cellphone: string | null;
  city_id: number;
  country_code: string | null;
  country_phone_code: string | null;
  created_at: string;
  deleted_at: string | null;
  driver_zone_restriction: boolean;
  dropdown_option: string | null;
  dropdown_option_id: number | null;
  email: string;
  email_verified: boolean;
  enabled: boolean;
  external_id: string | null;
  franchise_id: number | null;
  guest_id: number | null;
  id: number;
  ideal_orders: number | null;
  internal_number: string | null;
  language_id: number;
  last_available_at: string | null;
  last_location_at: string | null;
  last_order_assigned_at: string | null;
  last_service_assigned_at: string | null;
  lastname: string;
  level: number;
  location: { lat: number; lng: number };
  login_type: number;
  loyalty_id: number | null;
  loyalty_level: string | null;
  loyalty_level_id: number | null;
  loyalty_level_points: number;
  map_data: string | null;
  max_days_in_future: number | null;
  middle_name: string | null;
  mono_session: boolean;
  name: string;
  occupation_id: number | null;
  phone: string | null;
  phone_verified: boolean;
  photo: string;
  pin: string | null;
  platform: string;
  priority: number;
  push_notifications: boolean;
  register_site_id: number | null;
  schedule: string | null;
  schedule_ranges: string | null;
  second_lastname: string | null;
  session: any; // You can specify the session type as needed
  session_strategy: string;
  settings: any; // You can specify the settings type as needed
  social_id: string | null;
  timezone: string | null;
  updated_at: string;
  user_system_id: number | null;
  zipcode: string;
}

interface AuthData {
  error: boolean;
  result: UserData;
}

const FeedbackContext = createContext<FeedbackContextProps>({
  feedback: [],
  isLoading: false,
  selectedTip: undefined,
  setSelectedTip: function (value: number): void {
    throw new Error("Function not implemented.");
  },
});

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useAuth must be used within an FeedbackProvider");
  }
  return context;
};

export const FeedbackProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [selectedTip, setSelectedTip] = useState<number | undefined>(undefined);

  // Fetch feedback
  const fetchFeedback = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/feedback`);
      setFeedback(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("There was an error fetching data", error);
      setIsLoading(false);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        isLoading,
        feedback,
        selectedTip,
        setSelectedTip,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
