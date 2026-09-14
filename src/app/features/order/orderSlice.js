import { createSlice } from "@reduxjs/toolkit";

const storedOrders = localStorage.getItem("ordersList")
  ? JSON.parse(localStorage.getItem("ordersList"))
  : [
      {
        id: "ORD-982145",
        status: "Delivered",
        createdAt: "Sep 10, 2026",
        totalAmount: 288.99,
        paymentMethod: "Credit / Debit Card",
        shippingAddress: "123 Main St, New Delhi, 110001",
        items: [
          {
            id: "01",
            productName: "Stone and Beam Westview",
            price: 193,
            qty: 1,
            imgUrl: "/static/media/arm-chair-01.jpg",
          },
        ],
      },
    ];

const initialState = {
  ordersList: storedOrders,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.ordersList.unshift(action.payload);
      localStorage.setItem("ordersList", JSON.stringify(state.ordersList));
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;

