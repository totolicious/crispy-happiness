import { isValid, parse } from "date-fns";
import { isString } from "lodash";

export const isValidStringDate = (stringDate: any) =>
  isString(stringDate) && isValid(parse(stringDate, "yyyy-MM-dd", new Date()));
