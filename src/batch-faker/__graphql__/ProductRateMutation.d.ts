/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductRateInput } from "./../../__graphql__/GlobalGraphTypes";

// ====================================================
// GraphQL mutation operation: ProductRateMutation
// ====================================================

export interface ProductRateMutation_productRate {
  _id: string;
}

export interface ProductRateMutation {
  productRate: ProductRateMutation_productRate;
}

export interface ProductRateMutationVariables {
  data: ProductRateInput;
  id: string;
}
