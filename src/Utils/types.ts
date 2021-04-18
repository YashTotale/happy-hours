// Material UI Imports
import { ParsableDate } from "@material-ui/pickers/constants/prop-types";

export interface HappyHour {
  name: string;
  description: string;
  start: ParsableDate;
  end: ParsableDate;
  tags: string[];
}
