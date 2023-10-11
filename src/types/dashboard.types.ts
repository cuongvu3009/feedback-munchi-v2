import { User } from "@/types/auth.types";

export interface Transaction {
  id: number;
  createdAt: string;
  businessSlug: string;
  paymentAmount: number;
  currency: string;
  paymentId: string;
  stripeSessionId: string;
}

export interface BusinessProps {
  slug: string;
  logo: string;
  id: number;
  name: string;
  about: string;
  address: string;
  address_notes: string | null;
  alcohol: boolean;
  always_deliver: boolean;
  available_menus_count: number;
  available_menus_shared_count: number;
  available_products_count: number;
  cancel_order_after_minutes: number;
  categories: any[]; // You can create an interface for Category if needed
  categories_shared: any[];
  cellphone: string | null;
  checkoutfields: {
    name: any;
    address: any;
    address_notes: any;
    driver_tip: any;
    coupon: any;
  };
  city: {
    id: number;
    name: string;
    country_id: number;
    administrator_id: number;
    enabled: boolean;
  };
}

export interface LineChartProps {
  businessSlug: string;
  type: string;
}

export interface ChartData {
  [date: string]: {
    date: string;
    totalScore: number;
    count: number;
  };
}

export interface EmojiLabelProps {
  emoji: string;
}

export interface DashboardResponseProps {
  businessSlug: string;
}

export interface DashboardScoreProps {
  type: string;
  businessSlug: string;
}

export interface SidebarProps {
  business?: BusinessProps;
  businessId?: number;
}

export interface ApiResponseLogin {
  data: User | null;
  loading: boolean;
  error: Error | null;
}
