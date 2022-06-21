import { isValidTckn } from '../utils/StringUtils';

export const tcknFunction = (ruleParams) => {
    const { value } = ruleParams;

    if (!value) {
        return null;
    }

    if (!isValidTckn(value)) {
        return { value: value };
    }

    return null;
};
