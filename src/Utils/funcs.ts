// Externals
import moment from "moment";

// Internals
import { FirestoreDate } from "./types";

export const parseFirestoreDate = (d: FirestoreDate): Date => {
  return new Date(d.seconds * 1000 + d.nanoseconds / 1000000);
};

export const createTimePeriod = (
  start: FirestoreDate,
  end: FirestoreDate
): string => {
  const s = moment(parseFirestoreDate(start));
  const e = moment(parseFirestoreDate(end));

  if (
    s.year() === e.year() &&
    s.month() === e.month() &&
    s.date() === e.date()
  ) {
    return `${s.format("LT")} - ${e.format("LT")} (${s.format(
      "MMMM D, YYYY"
    )})`;
  }

  return `${s.format("LT (MMMM, D, YYYY)")} - ${e.format(
    "LT (MMMM, D, YYYY)"
  )}`;
};
