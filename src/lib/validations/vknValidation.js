import { isValidVkn } from '../utils/StringUtils';

export const vknFunction = (ruleParams) => {
    const { value } = ruleParams;

    if (!value) {
        return null;
    }

    if (!isValidVkn(value)) {
        return { value: value };
    }

    return null;
};
