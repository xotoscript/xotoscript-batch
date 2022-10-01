/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShopCreateInput } from "./../../__graphql__/GlobalGraphTypes";

// ====================================================
// GraphQL mutation operation: CreateShopMutation
// ====================================================

export interface CreateShopMutation_shopCreate {
  _id: string;
  category: string;
}

export interface CreateShopMutation {
  shopCreate: CreateShopMutation_shopCreate;
}

export interface CreateShopMutationVariables {
  shopCreateInput: ShopCreateInput;
}
