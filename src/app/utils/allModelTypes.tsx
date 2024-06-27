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
    payments?: Payment[];
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
    returns?: Return[];
  };
  
  export type Payment = {
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
    payment?: Payment;
  };
  
  export type Return = {
    id: number;
    orderItemId: number;
    reason: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    orderItem?: OrderItemType;
  };
  
  
  
  

  
  