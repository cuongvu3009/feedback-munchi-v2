export interface Feedback {
  id: number;
  emoji: any;
  businessSlug: string;
  comment: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
  type: string;
}
export interface Restaurant {
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

export interface ButtonProps {
  version?: "primary" | "secondary" | "full" | "normal";
  type?: "submit" | "button" | "reset";
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btnText: string;
}

export interface EmojiProps {
  symbol: any;
  label: string;
  size: number;
}

export interface PaymentButtonProps {
  btnText: string;
  paymentLink: string;
  btnVersion: string;
}

export interface SvgProps {
  size: number;
}

export interface CommentProps {
  type: string;
  emoji: string;
}

export interface FeedbackTagsProps {
  type: string;
  emoji: string;
}

export interface Restaurant {
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
export interface RestaurantLogoProps {
  restaurant: Restaurant | undefined;
}

export interface RatingProps {
  type: string;
  businessSlug: string;
}

export interface RatingItem {
  type: string;
  emoji: string;
  businessSlug: string;
  comment?: string;
  tags?: string[];
}

export interface ThankyoukPageProps {
  params: { businessSlug: string };
}
