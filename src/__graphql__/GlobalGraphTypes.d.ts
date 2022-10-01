/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CollectionCreateInput {
  productList?: string[] | null;
  title: string;
  subtitle: string;
  description: string;
}

export interface GeolocationDataInput {
  countryCode?: string | null;
  city?: string | null;
  type?: string | null;
  address?: string | null;
}

export interface MeetupCreateInput {
  title: string;
  description: string;
  tags?: string[] | null;
  imgUrlList?: string[] | null;
  address: string;
  startDate: any;
  endDate: any;
  coHost?: string | null;
  productList?: string[] | null;
}

export interface ProductCreateInput {
  title: string;
  description: string;
  originalPrice: number;
  category: string;
  section: string;
  subcategory: string;
  categoryOptionList?: ProductOptionInput[] | null;
  tag?: string[] | null;
  isOnSale?: boolean | null;
  salePercentage?: number | null;
  imgUrlList?: string[] | null;
  inventory: number;
  colorCode: string;
  subColorCode: string;
  productListRelated?: ProductRelatedInput[] | null;
  productCurrency: string;
  variantOf?: string | null;
}

export interface ProductOptionInput {
  title: string;
  value: string;
}

export interface ProductRateInput {
  review: string;
  stars: number;
}

export interface ProductRelatedInput {
  product: string;
}

export interface ShopCreateInput {
  shopName: string;
  display?: boolean | null;
  isFeatured?: boolean | null;
  description?: string | null;
  mission?: string | null;
  banner?: string | null;
  category: string;
  geolocation?: GeolocationDataInput | null;
}

export interface UserSignupInput {
  firstName: string;
  email: string;
  password: string;
  city: string;
  countryCode: string;
  userCurrency: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
