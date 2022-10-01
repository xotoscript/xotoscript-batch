/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductCreateInput } from "./../../__graphql__/GlobalGraphTypes";

// ====================================================
// GraphQL mutation operation: CreateProductMutation
// ====================================================

export interface CreateProductMutation_productCreate {
  _id: string;
}

export interface CreateProductMutation {
  productCreate: CreateProductMutation_productCreate;
}

export interface CreateProductMutationVariables {
  productCreateInput: ProductCreateInput;
}
