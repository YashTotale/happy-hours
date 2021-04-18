import { FirebaseReducer, TypeWithId } from "react-redux-firebase";
import { RootState, Profile } from "../Store";
import { HappyHour } from "../Utils/types";

/**
 * Firebase
 */

export const getUser = (state: RootState): FirebaseReducer.AuthState =>
  state.firebase.auth;

export const getUsers = (state: RootState): Record<string, Profile> =>
  state.firestore.data.users;

export const getUsersLoading = (state: RootState): boolean =>
  state.firestore.status.requesting.users;

export const getHappyHours = (state: RootState): TypeWithId<HappyHour>[] =>
  state.firestore.ordered.happyHours;

export const getHappyHoursLoading = (state: RootState): boolean =>
  state.firestore.status.requesting.happyHours;

/**
 * Display Slice
 */

export {
  // -> Slice
  default as displaySlice,
  // -> Selectors
  getIsDarkMode,
  getIsMenuOpen,
  // -> Actions
  toggleDarkMode,
  toggleMenuOpen,
  // -> Reducer
  displayReducer,
  // -> State
  initialDisplayState,
} from "./display.slice";

export type { DisplayState } from "./display.slice";

/**
 * Popup Slice
 */

export {
  // -> Slice
  default as popupSlice,
  // -> Selectors
  getPopupOpen,
  getPopupType,
  // -> Actions
  togglePopup,
  setPopupType,
  // -> Reducer
  popupReducer,
  // -> State
  initialPopupState,
} from "./popup.slice";

export type { PopupState } from "./popup.slice";

/**
 * Display Slice
 */

export {
  // -> Slice
  default as filtersSlice,
  // -> Selectors
  getSortFilter,
  // -> Actions
  setSort,
  // -> Reducer
  filtersReducer,
  // -> State
  initialFiltersState,
} from "./filters.slice";

export type { FiltersState } from "./filters.slice";
