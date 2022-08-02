import React, { memo, useContext } from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import tr from 'react-phone-input-2/lang/tr.json';
import PropTypes from 'prop-types';
import { FormHelperText } from '@mui/material';
import { getClassName } from '../utils/ClassNameUtils';
import ComfortReactContext from '../ComfortReactContext';

const PhoneInput = ({
    id,
    containerClassName,
    path,
    value,
    setPathIsBlurred,
    setPathValue,
    errorMessage,
    noHelperText,
    onChange,
    onBlur,
    renderErrorMessage,
    helperTextProps,
    fullWidth,
    disabled,
    localization,
    ...rest
}) => {
    const context = useContext(ComfortReactContext);
    const { lang } = context;

    const _containerClassName = getClassName([
        containerClassName,
        'ComfortPhoneInput',
        fullWidth ? 'fullWidth' : '',
        disabled ? 'disabled' : '',
        errorMessage ? 'hasError' : '',
    ]);

    const handleOnChange = (inputValue, data) => {
        if (setPathValue && onChange) {
            throw new Error('Only one of setPathValue or onChange props should be passed');
        }
        const newValue = {
            callingCode: data.dialCode,
            number: inputValue.slice(data.dialCode?.length || 0),
        };
        if (setPathValue) {
            setPathValue(path, newValue);
        } else if (onChange) {
            onChange(newValue);
        }
    };

    const handleOnBlur = () => {
        if (setPathIsBlurred && onBlur) {
            throw new Error('Only one of setPathIsBlurred or onBlur props should be passed');
        }
        if (setPathIsBlurred) {
            setPathIsBlurred(id || path);
        } else if (onBlur) {
            onBlur();
        }
    };

    const getValue = () => `${value?.callingCode}${value?.number}`;

    const getEmptyHelperText = () => {
        if (noHelperText) {
            return '';
        }
        return ' ';
    };

    const getHelperText = () => {
        if (errorMessage) {
            if (renderErrorMessage) {
                return renderErrorMessage(errorMessage);
            } else {
                return errorMessage;
            }
        }
        return getEmptyHelperText();
    };

    const _localization = localization || lang === 'tr' ? tr : undefined;

    return (
        <>
            <div id={id || path} className={_containerClassName}>
                <ReactPhoneInput
                    value={getValue() || ''}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    isValid={!errorMessage}
                    disabled={disabled}
                    localization={_localization}
                    key={lang} // to force re-render after language change (phone-input bug)
                    {...rest}
                />
            </div>
            <FormHelperText error={!!errorMessage} {...helperTextProps}>
                {getHelperText()}
            </FormHelperText>
        </>
    );
};

PhoneInput.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.string,
    containerClassName: PropTypes.string,
    setPathValue: PropTypes.func,
    errorMessage: PropTypes.string,
    setPathIsBlurred: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    noHelperText: PropTypes.bool,
    disabled: PropTypes.bool,
    renderErrorMessage: PropTypes.func,
    helperTextProps: PropTypes.object,
    fullWidth: PropTypes.bool,
};

export default memo(PhoneInput);
