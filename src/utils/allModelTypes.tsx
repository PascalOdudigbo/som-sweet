import { StaticImageData } from "next/image";

export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  roleId: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  role?: RoleType;
  addresses?: AddressType[];
  orders?: OrderType[];
  reviews?: ProductReviewType[];
  wishlist?: ProductType[];
  stripeCustomerId?: string | null;
  cart?: CartType | null;
}

export interface RoleType {
  id: number;
  name: string;
  users?: UserType[];
}

export interface AddressType {
  id: number;
  userId: number;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  user?: UserType;
  orders?: OrderType[];
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
  imagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
  products?: ProductType[];
}

export interface ProductType {
  id: number;
  name: string;
  description?: string | null;
  basePrice: number;
  categoryId: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  category?: CategoryType;
  variations?: ProductVariationType[];
  images?: ProductImageType[];
  reviews?: ProductReviewType[];
  orderItems?: OrderItemType[];
  discounts?: DiscountProductType[];
  cartItems?: CartItemType[];
  wishlistedBy?: UserType[];
}

export interface ProductVariationType {
  id: number;
  productId: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  product?: ProductType;
  cartItems?: CartItemType[];
  orderItems?: OrderItemType[];
}

export interface ProductImageType {
  id: number;
  productId: number;
  imageUrl: string | StaticImageData;
  imagePublicId: string;
  createdAt: Date;
  product?: ProductType;
}

export interface DiscountType {
  id: number;
  name: string;
  description?: string | null;
  discountPercent: number;
  validFrom: Date;
  validUntil: Date;
  imageUrl?: string | null | StaticImageData;
  imagePublicId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  products?: DiscountProductType[];
}

export interface DiscountProductType {
  productId: number;
  discountId: number;
  product?: ProductType;
  discount?: DiscountType;
}

export interface ProductReviewType {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  review?: string | null;
  createdAt: Date;
  updatedAt: Date;
  product?: ProductType;
  user?: UserType;
}

export interface CartType {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: UserType;
  items: CartItemType[];
}

export interface CartItemType {
  id: number;
  cartId: number;
  productId: number;
  variationId?: number | null;
  quantity: number;
  customText?: string | null;
  cart?: CartType;
  product: ProductType;
  variation?: ProductVariationType | null;
}

export interface OrderType {
  id: number;
  userId: number;
  total: number;
  status: string;
  shippingAddressId: number;
  createdAt: Date;
  updatedAt: Date;
  user?: UserType;
  shippingAddress?: AddressType;
  orderItems?: OrderItemType[];
  payment?: PaymentType | null;
}

export interface OrderItemType {
  id: number;
  orderId: number;
  productId: number;
  variationId?: number | null;
  quantity: number;
  price: number;
  customText?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  order?: OrderType;
  product?: ProductType;
  variation?: ProductVariationType | null;
}

export interface PaymentType {
  id: number;
  orderId: number;
  stripePaymentId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  order?: OrderType;
}

export interface BusinessType {
  id: number;
  name: string;
  description?: string | null;
  refundsPolicy?: string | null;
  phone: string;
  email: string;
  address: string;
  socialLinks?: SocialMediaType[];
}

export interface SocialMediaType {
  id: number;
  businessId: number;
  name: string;
  url: string;
  business?: BusinessType;
}