import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export interface DisplayState {
  isDarkMode: boolean | null;
  isMenuOpen: boolean;
}

export const initialDisplayState: DisplayState = {
  isDarkMode: null,
  isMenuOpen: false,
};

const displaySlice = createSlice({
  name: "display",
  initialState: initialDisplayState,
  reducers: {
    toggleDarkMode: (state, action: PayloadAction<boolean | undefined>) => ({
      ...state,
      isDarkMode: action.payload ?? !state.isDarkMode,
    }),
    toggleMenuOpen: (state, action: PayloadAction<boolean | undefined>) => ({
      ...state,
      isMenuOpen: action.payload ?? !state.isMenuOpen,
    }),
  },
});

// Actions
export const { toggleDarkMode, toggleMenuOpen } = displaySlice.actions;

// Selectors
export const getIsDarkMode = (state: RootState): DisplayState["isDarkMode"] =>
  state.display.isDarkMode;

export const getIsMenuOpen = (state: RootState): DisplayState["isMenuOpen"] =>
  state.display.isMenuOpen;

// Reducer
export const displayReducer = displaySlice.reducer;

export default displaySlice;
