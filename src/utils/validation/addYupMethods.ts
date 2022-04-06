import * as Yup from "yup";
import {isValidStringDate} from "./methods";

export const addYupMethods = () => {
    Yup.addMethod<Yup.StringSchema>(
        Yup.string,
        "stringDate",
        function(message) {
            return this.test('stringDate', message, isValidStringDate);
        }
    );

}
