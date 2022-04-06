import * as Yup from "yup";
import { isValidStringDate } from "./isValidStringDate";

export const addYupMethods = () => {
  // eslint-disable-next-line func-names
  Yup.addMethod<Yup.StringSchema>(Yup.string, "stringDate", function (message) {
    return this.test("stringDate", message, isValidStringDate);
  });
};
