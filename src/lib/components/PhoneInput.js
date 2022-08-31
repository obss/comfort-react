import React, { memo, useContext, useState } from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import tr from 'react-phone-input-2/lang/tr.json';
import PropTypes from 'prop-types';
import { FormHelperText } from '@mui/material';
import { getClassName } from '../utils/ClassNameUtils';
import ComfortReactContext from '../ComfortReactContext';
import useHelperText from '../hooks/useHelperText';
import useOnBlur from '../hooks/useOnBlur';

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
    onFocus,
    renderErrorMessage,
    helperTextProps,
    fullWidth,
    disabled,
    localization,
    label,
    ...rest
}) => {
    const [focused, setFocused] = useState(false);
    const helperText = useHelperText({ errorMessage, noHelperText, renderErrorMessage });
    const handleOnBlur = useOnBlur({ setPathIsBlurred, onBlur, id, path, setFocused });
    const context = useContext(ComfortReactContext);
    const { lang } = context;

    const _containerClassName = getClassName([
        containerClassName,
        'ComfortPhoneInput',
        fullWidth ? 'fullWidth' : '',
        disabled ? 'disabled' : '',
        errorMessage ? 'hasError' : '',
        focused ? 'hasFocus' : '',
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

    const handleOnFocus = (e) => {
        setFocused(true);
        if (onFocus) {
            onFocus(e);
        }
    };

    const getValue = () => `${value?.callingCode}${value?.number}`;

    const _localization = localization || lang === 'tr' ? tr : undefined;

    return (
        <>
            <div id={id || path} className={_containerClassName}>
                <ReactPhoneInput
                    specialLabel={label}
                    value={getValue() || ''}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    onFocus={handleOnFocus}
                    isValid={!errorMessage}
                    disabled={disabled}
                    localization={_localization}
                    key={lang} // to force re-render after language change (phone-input bug)
                    {...rest}
                />
            </div>
            <FormHelperText error={!!errorMessage} {...helperTextProps}>
                {helperText}
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
    onFocus: PropTypes.func,
    noHelperText: PropTypes.bool,
    disabled: PropTypes.bool,
    renderErrorMessage: PropTypes.func,
    helperTextProps: PropTypes.object,
    fullWidth: PropTypes.bool,
};

export default memo(PhoneInput);
