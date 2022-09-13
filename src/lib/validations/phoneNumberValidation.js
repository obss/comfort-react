import { isValidPhoneNumber } from 'libphonenumber-js';
import { PHONE_NUMBER_MESSAGE_KEY } from '../constants/constants';

export const phoneNumberValidation = (params) => {
    const { context, value } = params;
    const { lang, translations } = context;

    if (!value) {
        return null;
    }
    const number = `+${value}`;

    const isValid = isValidPhoneNumber(number);

    if (!isValid) {
        return translations[lang][PHONE_NUMBER_MESSAGE_KEY];
    }
    return null;
};
