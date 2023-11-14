export const isNullOrUndefined = (param) => {
    const result = param === undefined || param === null;
    return result;
};

export const isEmptyString = (param) => {
    const result = param === undefined || param === null || param === '';
    return result;
};

export const isFunction = (functionToCheck) => {
    const typeString = {}.toString.call(functionToCheck);
    return typeString === '[object Function]' || typeString === '[object AsyncFunction]';
};
