import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: any = {
  items: [],
  total: 0,
  discountedTotal: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<any>) => {
      const { id, quantity, ...productDetails } = action.payload;
      const existingItem = state.items.find((item:any) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...productDetails, id, quantity });
      }

      state.total = state.items.reduce(
        (sum: any, item: any) => sum + item.price * item.quantity,
        0
      );
      state.discountedTotal = state.items.reduce(
        (sum: any, item: any) =>
          sum +
          item.price *
            (1 - (item.discountPercentage || 0) / 100) *
            item.quantity,
        0
      );
      state.totalQuantity = state.items.reduce(
        (sum: any, item: any) => sum + item.quantity,
        0
      );
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item: any) => item.id !== action.payload
      );

      state.total = state.items.reduce(
        (sum: any, item: any) => sum + item.price * item.quantity,
        0
      );
      state.discountedTotal = state.items.reduce(
        (sum: any, item: any) =>
          sum +
          item.price *
            (1 - (item.discountPercentage || 0) / 100) *
            item.quantity,
        0
      );
      state.totalQuantity = state.items.reduce(
        (sum: any, item: any) => sum + item.quantity,
        0
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find(
        (item: any) => item.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.total = state.items.reduce(
        (sum: any, item: any) => sum + item.price * item.quantity,
        0
      );
      state.discountedTotal = state.items.reduce(
        (sum: any, item: any) =>
          sum +
          item.price *
            (1 - (item.discountPercentage || 0) / 100) *
            item.quantity,
        0
      );
      state.totalQuantity = state.items.reduce(
        (sum: any, item: any) => sum + item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.discountedTotal = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
