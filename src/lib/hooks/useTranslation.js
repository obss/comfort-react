import { useCallback, useContext } from 'react';
import ComfortReactContext from '../ComfortReactContext';
import { getMessage } from '../translations/messages';

const useTranslation = () => {
    const context = useContext(ComfortReactContext);
    if (!context) {
        throw new Error('comfort-react error. useTranslation hook must be used inside ComfortReactContext context');
    }
    const { lang } = context;

    const getLocalizedMessage = useCallback(
        (messageKey, params) => {
            if (!messageKey) {
                return '';
            }
            return getMessage(messageKey, lang, params);
        },
        [lang]
    );

    return {
        getLocalizedMessage,
    };
};

export default useTranslation;
