/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserSignupInput } from "./../../__graphql__/GlobalGraphTypes";

// ====================================================
// GraphQL mutation operation: CreateVendorMutation
// ====================================================

export interface CreateVendorMutation_userSignup_user {
  _id: string;
  firstName: string;
}

export interface CreateVendorMutation_userSignup {
  token: string;
  user: CreateVendorMutation_userSignup_user;
}

export interface CreateVendorMutation {
  userSignup: CreateVendorMutation_userSignup;
}

export interface CreateVendorMutationVariables {
  userSignupInput: UserSignupInput;
}
