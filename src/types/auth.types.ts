import { ReactNode } from "react";

export interface UserAPIProps {
  error: boolean;
  result: User;
}
export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  login_type: number;
  social_id: string | null;
  photo: string;
  birthdate: string | null;
  phone: string | null;
  cellphone: string | null;
  city_id: number;
  dropdown_option_id: string | null;
  address: string;
  address_notes: string | null;
  zipcode: string;
  location: {
    lat: number;
    lng: number;
  };
  level: number;
  language_id: number;
  push_notifications: boolean;
  busy: boolean;
  available: boolean;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  internal_number: string | null;
  map_data: string | null;
  middle_name: string | null;
  second_lastname: string | null;
  country_phone_code: string | null;
  priority: number;
  last_order_assigned_at: string | null;
  last_location_at: string | null;
  phone_verified: boolean;
  email_verified: boolean;
  driver_zone_restriction: boolean;
  pin: string | null;
  business_id: number | null;
  franchise_id: number | null;
  register_site_id: number | null;
  ideal_orders: number | null;
  external_id: string | null;
  settings: string | null;
  loyalty_level_id: number | null;
  loyalty_level_points: number;
  country_code: string | null;
  session_strategy: string;
  schedule: string | null;
  schedule_ranges: string | null;
  max_days_in_future: number | null;
  occupation_id: number | null;
  bio: string | null;
  last_service_assigned_at: string | null;
  timezone: string | null;
  user_system_id: number | null;
  platform: string;
  loyalty_id: number | null;
  guest_id: number | null;
  last_available_at: string | null;
  mono_session: boolean;
  session: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
  dropdown_option: string | null;
  loyalty_level: string | null;
}

export interface AuthProviderProps {
  children: ReactNode;
}
