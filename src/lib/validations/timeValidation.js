import { isEmptyString, isFunction } from '../utils/ControlUtils';

const COMPARISON_KEYS = [
    'equalTo',
    'lessThan',
    'lessThanOrEqualTo',
    'greaterThan',
    'greaterThanOrEqualTo',
    'notEqualTo',
];

const compareValuesAccordingToKey = (compareParams) => {
    const { currentValue, targetValue, comparisonKey } = compareParams;

    switch (comparisonKey) {
        case 'equalTo':
            return currentValue === targetValue;
        case 'greaterThanOrEqualTo':
            return currentValue >= targetValue;
        case 'lessThanOrEqualTo':
            return currentValue <= targetValue;
        case 'greaterThan':
            return currentValue > targetValue;
        case 'lessThan':
            return currentValue < targetValue;
        case 'notEqualTo':
            return currentValue !== targetValue;
        default:
            return false;
    }
};

const isValidTime = (str) => {
    const result = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(str);
    return result;
};

export const timeValidation = (params) => {
    const { formData = {}, value = null, indexOfList, options } = params;

    if (value) {
        if (!isValidTime(value)) {
            return { isCommonError: true, messageKey: 'valueIsNotAValidTime' };
        }

        let comparisonKey = null;
        for (let i = 0; i < COMPARISON_KEYS.length; i += 1) {
            const candidateKey = COMPARISON_KEYS[i];
            const canditateValue = options[candidateKey];
            if (!isEmptyString(canditateValue)) {
                comparisonKey = candidateKey;
                break;
            }
        }

        if (!comparisonKey) {
            return null;
        }

        let comparisonValue = null;
        if (isFunction(options[comparisonKey])) {
            const comparisonFunction = options[comparisonKey];
            comparisonValue = comparisonFunction(formData, indexOfList);
        } else {
            comparisonValue = options[comparisonKey];
        }

        if (!comparisonValue) {
            return { isCommonError: true, messageKey: 'comparisonTimeValueNotFound' };
        }

        if (!isValidTime(comparisonValue)) {
            return { isCommonError: true, messageKey: 'comparisonValueIsNotAValidTime' };
        }

        const compareParams = {
            comparisonKey,
            currentValue: value,
            targetValue: comparisonValue,
        };
        const comparisonResult = compareValuesAccordingToKey(compareParams);
        if (!comparisonResult) {
            return { value: value, comparisonValue: comparisonValue, comparisonKey: comparisonKey };
        }
    }
    return null;
};
