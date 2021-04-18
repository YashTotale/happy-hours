import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type Sort =
  | "Most Recently Created"
  | "Least Recently Created"
  | "Most Attendees"
  | "Least Attendees";

export const sortValues: Sort[] = [
  "Most Recently Created",
  "Least Recently Created",
  "Most Attendees",
  "Least Attendees",
];

export interface FiltersState {
  sort: Sort;
}

export const initialFiltersState: FiltersState = {
  sort: sortValues[0],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFiltersState,
  reducers: {
    setSort: (state, action: PayloadAction<FiltersState["sort"]>) => ({
      ...state,
      sort: action.payload,
    }),
  },
});

// Actions
export const { setSort } = filtersSlice.actions;

// Selectors
export const getSortFilter = (state: RootState): FiltersState["sort"] =>
  state.filters.sort;

// Reducer
export const filtersReducer = filtersSlice.reducer;

export default filtersSlice;
