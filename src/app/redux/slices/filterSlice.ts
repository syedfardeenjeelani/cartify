import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
}

const initialState: FilterState = {
  category: "",
  minPrice: 0,
  maxPrice: 1000,
  rating: 0,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
  },
});

export const { setCategory, setPriceRange, setRating } = filterSlice.actions;
export default filterSlice.reducer;
