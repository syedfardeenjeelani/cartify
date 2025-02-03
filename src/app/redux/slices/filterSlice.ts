import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
}

const initialState: FilterState = {
  query: "",
  category: "",
  minPrice: 0,
  maxPrice: 1000,
  rating: 0,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
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

export const { setQuery, setCategory, setPriceRange, setRating } =
  filterSlice.actions;
export default filterSlice.reducer;
