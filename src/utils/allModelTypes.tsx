import { StaticImageData } from "next/image";

export type RoleType = {
  id: number;
  name: string;
  users?: UserType[];
};

export type UserType = {
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
  stripeCustomerId?: string;
};

export type AddressType = {
  id: number;
  userId: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  user?: UserType;
  orders?: OrderType[];
};

export type CategoryType = {
  id: number;
  name: string;
  image: string | StaticImageData;
  imagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
  products?: ProductType[];
};

export type ProductType = {
  id: number;
  name: string;
  description?: string;
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
  discounts?: DiscountType[];
  wishlistedBy?: UserType[];
};

export type ProductVariationType = {
  id: number;
  productId: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  product?: ProductType;
  orderItems?: OrderItemType[];
};

export type ProductImageType = {
  id: number;
  productId: number;
  imageUrl: string;
  imagePublicId: string;
  createdAt: Date;
  product?: ProductType;
};

export type DiscountType = {
  id: number;
  productId: number;
  name: string;
  description?: string;
  discountPercent: number;
  validFrom: Date;
  validUntil: Date;
  imageUrl?: string;
  imagePublicId?: string;
  createdAt: Date;
  updatedAt: Date;
  product?: ProductType;
};

export type ProductReviewType = {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  review?: string;
  createdAt: Date;
  updatedAt: Date;
  product?: ProductType;
  user?: UserType;
};

export type OrderType = {
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
  payment?: PaymentType;
};

export type OrderItemType = {
  id: number;
  orderId: number;
  productId: number;
  variationId?: number;
  quantity: number;
  price: number;
  customText?: string;
  createdAt: Date;
  updatedAt: Date;
  order?: OrderType;
  product?: ProductType;
  variation?: ProductVariationType;
};

export type PaymentType = {
  id: number;
  orderId: number;
  stripePaymentId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  order?: OrderType;
};

export type BusinessType = {
  id: number;
  name: string;
  description?: string;
  refundsPolicy?: string;
  phone: string;
  email: string;
  address: string;
  socialLinks?: SocialMediaType[];
};

export type SocialMediaType = {
  id: number;
  businessId: number;
  name: string;
  url: string;
  business?: BusinessType;
};