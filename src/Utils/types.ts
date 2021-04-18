// Material UI Imports
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

export interface FirestoreDate {
  seconds: number;
  nanoseconds: number;
}

export interface HappyHourInputs {
  title: string;
  tags: string[];
  link: string;
  description: string;
  start: ParsableDate;
  end: ParsableDate;
}

export interface HappyHour extends HappyHourInputs {
  start: FirestoreDate;
  end: FirestoreDate;
  created: FirestoreDate;
  createdBy: string[];
  attendees: string[];
}
