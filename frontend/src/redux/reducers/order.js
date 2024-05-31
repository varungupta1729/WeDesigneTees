import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
  
    .addCase("getAllOrdersUserRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("getAllOrdersUserSuccess", (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersUserFailed" ,(state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Shop related actions
    .addCase("getAllOrdersShopRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("getAllOrdersShopSuccess", (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Admin related actions
    .addCase("adminAllOrdersRequest", (state) => {
      state.adminOrderLoading = true;
      state.error = null;
    })
    .addCase("adminAllOrdersSuccess", (state, action) => {
      state.adminOrderLoading = false;
      state.error = null;
      state.adminOrders = action.payload;
    })
    .addCase("adminAllOrdersFailed", (state, action) => {
      state.adminOrderLoading = false;
      state.error = action.payload;
    })

    // Clear errors action
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});