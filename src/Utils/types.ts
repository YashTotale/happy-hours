// Material UI Imports
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

interface FirestoreDate {
  seconds: number;
  nanoseconds: number;
}

export interface HappyHourInputs {
  name: string;
  description: string;
  start: ParsableDate;
  end: ParsableDate;
  tags: string[];
}
export interface HappyHour extends HappyHourInputs {
  start: FirestoreDate;
  end: FirestoreDate;
  created: FirestoreDate;
  createdBy: string[];
  attendees: string[];
}
