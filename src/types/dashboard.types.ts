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
