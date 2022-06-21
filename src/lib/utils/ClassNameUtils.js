import { isEmptyString } from './ControlUtils';

export const getClassName = (classes) => {
    const filteredClassNames = classes.filter((c) => !isEmptyString(c));
    return filteredClassNames.join(' ');
};
