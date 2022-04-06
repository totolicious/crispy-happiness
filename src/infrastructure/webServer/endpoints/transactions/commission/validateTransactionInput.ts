import * as Yup from 'yup';
import {ValidationError} from "../../../../../utils";
import {pick} from "lodash";

// TODO: this really needs to be moved to a generic types directory and included in tsconfig
declare module "yup" {
    export interface StringSchema {
        stringDate(message: string): StringSchema;
    }
}

type ValidateTransactionInputReturnType = {
    error: ValidationError;
    transaction: null
} | {
    error: null
    transaction: {
        date: string;
        amount: number;
        currency: string;
        client_id: number;
    }
}

export const validateTransactionInput = async (data: any): Promise<ValidateTransactionInputReturnType> => {
    const schema = Yup.object().shape({
        date: Yup.string()
            .stringDate("the 'date' property has an invalid value")
            .required("the 'date' property is required"),
        amount: Yup.number()
            .moreThan(0, "the 'amount' property must be greater than zero")
            .required("the 'amount' property is required"),
        currency: Yup.string().required("the 'currency' property is required"),
        client_id: Yup.number()
            .integer("the 'currency' property must be a positive integer")
            .min(1, "The 'client_id' property must be a positive integer" )
            .required("The 'client_id' property is required")
    });

    let transaction;

    try {
        transaction = await schema.validate(data);
    } catch (e) {
        return {
            error: pick(e, ['name', 'message']) as ValidationError,
            transaction: null
        }
    }

    return {error: null, transaction};
}
