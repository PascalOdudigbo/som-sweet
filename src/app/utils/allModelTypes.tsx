export type RoleType = {
  id: number;
  roleName: string;
  users?: UserType[];
};

export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  role?: RoleType;
  addresses?: AddressType[];
  orders?: OrderType[];
  reviews?: ProductReviewType[];
  wishlist?: string[];
};

export type AddressType = {
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
};

export type CategoryType = {
  id: number;
  name: string;
  image: string;
  imagePublicId: string;
  products?: ProductType[];
};

export type ProductType = {
  id: number;
  name: string;
  description?: string | null;
  basePrice: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  category?: CategoryType;
  variations?: ProductVariationType[];
  images?: ProductImageType[];
  reviews?: ProductReviewType[];
  orderItems?: OrderItemType[];
  offers?: OfferType[];
};

export type OfferType = {
  id: number;
  productId: number;
  name: string;
  discountPercentage: number;
  description: string;
  validFrom: Date;
  validUntil: Date;
  image: string;
  imagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductVariationType = {
  id: number;
  productId: number;
  name: string;
  price: number;
  stock: number;
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

export type ProductReviewType = {
  id: number;
  productId: number;
  userId: number;
  rating: number;
  review?: string | null;
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
  payments?: PaymentType[];
};

export type OrderItemType = {
  id: number;
  orderId: number;
  productId: number;
  variationId?: number | null;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  order?: OrderType;
  product?: ProductType;
  variation?: ProductVariationType | null;
  returns?: ReturnType[];
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
  refunds?: RefundType[];
};

export type RefundType = {
  id: number;
  paymentId: number;
  stripeRefundId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  payment?: PaymentType;
};

export type ReturnType = {
  id: number;
  orderItemId: number;
  reason: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  orderItem?: OrderItemType;
};

export type SocialMediaLinkType = {
  id: number;
  platform: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BusinessType = {
  id: number;
  name: string;
  welcomeText?: string | null;
  phone: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
};
