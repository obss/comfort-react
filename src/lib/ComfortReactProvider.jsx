import React from 'react';
import PropTypes from 'prop-types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import trLocale from 'date-fns/locale/tr';
import enLocale from 'date-fns/locale/en-US';
import { ReactValidatableFormProvider } from 'react-validatable-form';
import {
    DEFAULT_LANGUAGE,
    PHONE_NUMBER_MESSAGE_KEY,
    TCKN_MESSAGE_KEY,
    TIME_MESSAGE_KEY,
    VKN_MESSAGE_KEY,
} from './constants/constants';
import NotistackProvider from './notistack/NotistackProvider';
import ComfortReactContext from './ComfortReactContext';
import { validationMessages } from './translations/validationMessages';
import { phoneNumberValidation, tcknFunction, timeValidation } from './validations';
import { vknFunction } from './validations/vknValidation';

const comfortCustomRules = {
    [PHONE_NUMBER_MESSAGE_KEY]: phoneNumberValidation,
    [TIME_MESSAGE_KEY]: timeValidation,
    [TCKN_MESSAGE_KEY]: tcknFunction,
    [VKN_MESSAGE_KEY]: vknFunction,
};

const localeMap = {
    en: enLocale,
    tr: trLocale,
};

const ComfortReactProvider = (props) => {
    const {
        reactValidatableFormProps = {},
        lang: langProp,
        localizationProviderLocale,
        notistackProviderProps,
        useApiProps,
        renderErrorMessage,
    } = props;
    const { translations, customRules, ...restReactValidatableFormProps } = reactValidatableFormProps;
    const contextValue = {};
    const lang = langProp || DEFAULT_LANGUAGE;
    contextValue.lang = lang;
    contextValue.useApiProps = useApiProps;
    contextValue.renderErrorMessage = renderErrorMessage;

    const aggregatedReactValidatableFormProps = {
        lang: lang,
        customRules: { ...comfortCustomRules, ...customRules },
    };

    aggregatedReactValidatableFormProps.translations = JSON.parse(JSON.stringify(validationMessages));
    if (translations) {
        Object.keys(translations).forEach((langKey) => {
            if (!aggregatedReactValidatableFormProps.translations[langKey]) {
                aggregatedReactValidatableFormProps.translations[langKey] = {};
            }
            aggregatedReactValidatableFormProps.translations[langKey] = {
                ...aggregatedReactValidatableFormProps.translations[langKey],
                ...translations[langKey],
            };
        });
    }

    const allReactValidatableFormProps = {
        ...aggregatedReactValidatableFormProps,
        ...restReactValidatableFormProps,
    };

    return (
        <div className="ComfortReactApp">
            <ComfortReactContext.Provider value={contextValue}>
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={localizationProviderLocale || localeMap[lang] || localeMap[DEFAULT_LANGUAGE]}
                >
                    <NotistackProvider notistackProviderProps={notistackProviderProps}>
                        <ReactValidatableFormProvider {...allReactValidatableFormProps}>
                            {props.children}
                        </ReactValidatableFormProvider>
                    </NotistackProvider>
                </LocalizationProvider>
            </ComfortReactContext.Provider>
        </div>
    );
};

ComfortReactProvider.propTypes = {
    reactValidatableFormProps: PropTypes.object,
    lang: PropTypes.string,
    localizationProviderLocale: PropTypes.object,
    notistackProviderProps: PropTypes.object,
    useApiProps: PropTypes.object,
    renderErrorMessage: PropTypes.func,
    children: PropTypes.any,
};

export default ComfortReactProvider;
