import React from 'react';
import PropTypes from 'prop-types';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
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

import 'react-phone-input-2/lib/material.css';

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

const DEFAULT_CONTEXT_VALUE = {};
const DEFAULT_REACT_VALIDATABLE_FORM_PROPS = {};

const ComfortReactProvider = (props) => {
    const {
        reactValidatableFormProps = DEFAULT_REACT_VALIDATABLE_FORM_PROPS,
        lang: langProp,
        localizationProviderLocale,
        notistackProviderProps,
        useApiProps,
    } = props;
    const { translations, customRules, ...restReactValidatableFormProps } = reactValidatableFormProps;
    const contextValue = DEFAULT_CONTEXT_VALUE;
    const lang = langProp || DEFAULT_LANGUAGE;
    contextValue.lang = lang;
    contextValue.useApiProps = useApiProps;

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
                    locale={localizationProviderLocale || localeMap[lang] || localeMap[DEFAULT_LANGUAGE]}
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
};

export default ComfortReactProvider;
