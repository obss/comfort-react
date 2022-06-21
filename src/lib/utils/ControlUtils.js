export const isNullOrUndefined = (param) => {
    const result = param === undefined || param === null;
    return result;
};

export const isEmptyString = (param) => {
    const result = param === undefined || param === null || param === '';
    return result;
};

export const isFunction = (functionToCheck) => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};
