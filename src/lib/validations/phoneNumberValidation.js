import { PHONE_NUMBER_MESSAGE_KEY } from '../constants/constants';

export const phoneNumberValidation = (params) => {
    const { context, value = {}, options } = params;
    const { lang, translations } = context;
    const { isRequired } = options;
    const { callingCode, number = '' } = value;
    const { length } = number;

    if (isRequired && length < 1) {
        return translations[lang][`${PHONE_NUMBER_MESSAGE_KEY}.required`];
    }
    if (length) {
        if (callingCode === '90' && length < 10) {
            return translations[lang][`${PHONE_NUMBER_MESSAGE_KEY}.tr`];
        }
        if (callingCode !== '90' && length < 4) {
            return translations[lang][`${PHONE_NUMBER_MESSAGE_KEY}.other`];
        }
    }
    return null;
};
