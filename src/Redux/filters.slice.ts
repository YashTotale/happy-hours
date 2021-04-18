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
  search: {
    title: string;
    description: string;
    tags: string;
  };
}

export const initialFiltersState: FiltersState = {
  sort: sortValues[0],
  search: {
    title: "",
    description: "",
    tags: "",
  },
};

export const searches = Object.keys(
  initialFiltersState.search
) as (keyof typeof initialFiltersState.search)[];

const filtersSlice = createSlice({
  name: "filters",
  initialState: initialFiltersState,
  reducers: {
    setSort: (state, action: PayloadAction<FiltersState["sort"]>) => ({
      ...state,
      sort: action.payload,
    }),
    setSearch: (
      state,
      action: PayloadAction<Partial<FiltersState["search"]>>
    ) => ({
      ...state,
      search: {
        ...state.search,
        ...action.payload,
      },
    }),
  },
});

// Actions
export const { setSort, setSearch } = filtersSlice.actions;

// Selectors
export const getSortFilter = (state: RootState): FiltersState["sort"] =>
  state.filters.sort;

export const getSearch = (state: RootState): FiltersState["search"] =>
  state.filters.search;

// Reducer
export const filtersReducer = filtersSlice.reducer;

export default filtersSlice;
