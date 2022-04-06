import * as Yup from 'yup';
import {Currency} from "../../domains";
import {mapValues} from "lodash";

export const validateEndpointResponse = (data: any) => {
    const schema = Yup.object().required().shape({
        success: Yup.boolean().required().oneOf([true]).required(),
        base: Yup.string().required().oneOf([Currency.EUR]),
        // the currencies may change, so validation must
        // only validate the values
        rates: Yup.lazy(obj => Yup.object().required().shape(
            mapValues(obj.rates, () => Yup.number().required().moreThan(0))
        ))
    });

    return schema.validate(data);
}
