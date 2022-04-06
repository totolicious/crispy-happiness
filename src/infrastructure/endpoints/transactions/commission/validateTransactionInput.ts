import * as Yup from 'yup';
import {ValidationResult} from "../../../../utils";
import {pick} from "lodash";

// TODO: this really needs to be moved to a generic types directory and included in tsconfig
declare module "yup" {
    export interface StringSchema {
        stringDate(message: string): StringSchema;
    }
}

export const validateTransactionInput = async (transaction: any): Promise<ValidationResult> => {
    const schema = Yup.object().shape({
        date: Yup.string()
            .required("'date' property is missing from input")
            .stringDate("'date' property has an invalid value"),

    });

    try {
        await schema.validate(transaction);
        return { error: null }
    } catch (e) {
        return {
            error: pick(e, ['name', 'message'])
        } as ValidationResult
    }
}
