import * as Yup from 'yup';
import {ValidationResult} from "../../../../../utils";
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
            .required("the 'date' property is required")
            .stringDate("the 'date' property has an invalid value"),
        amount: Yup.number()
            .required("the 'amount' property is required")
            .moreThan(0, "the 'amount' property must be greater than zero"),
        currency: Yup.string().required("the 'currency' property is required"),
        client_id: Yup.number().required("The 'client_id' property is required")
            .integer("the 'currency' property must be a positive integer")
            .min(1)
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
