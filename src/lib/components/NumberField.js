import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { getClassName } from '../utils/ClassNameUtils';
import useTranslation from '../hooks/useTranslation';
import useHelperText from '../hooks/useHelperText';
import { DEFAULT_VARIANT } from '../constants/constants';
import useOnBlur from '../hooks/useOnBlur';

const NumberField = ({
    id,
    path,
    value,
    className,
    setPathValue,
    errorMessage,
    setPathIsBlurred,
    onChange,
    onBlur,
    onFocus,
    onKeyUp,
    onEnterPressed,
    noHelperText,
    variant,
    type,
    thousandSeparator,
    decimalSeparator,
    disabled,
    renderErrorMessage,
    label,
    focusedLabel,
    ...rest
}) => {
    const { getLocalizedMessage } = useTranslation();
    const [focused, setFocused] = useState(false);
    const helperText = useHelperText({ errorMessage, noHelperText, renderErrorMessage });
    const handleOnBlur = useOnBlur({ setPathIsBlurred, onBlur, id, path, setFocused });
    const _className = getClassName([className, 'ComfortNumberField']);

    const handleOnChange = (ev) => {
        const newValue = ev.floatValue;
        if (setPathValue && onChange) {
            throw new Error('Only one of setPathValue or onChange props should be passed');
        }
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

    const handleOnKeyUp = (e) => {
        if (e.keyCode === 13) {
            onEnterPressed?.();
        }
        onKeyUp?.(e);
    };

    const handleOnKeyPress = (e) => {
        if (type === 'number' && ['e', 'E'].includes(e.key)) {
            e.preventDefault();
        }
    };

    const getLabel = () => {
        if (focused || value) {
            return focusedLabel || label;
        }
        return label;
    };

    const getInputVariant = () => {
        return variant || DEFAULT_VARIANT;
    };

    const _decimalSeparator = decimalSeparator || getLocalizedMessage('DECIMAL_SEPARATOR');
    const _thousandSeparator = thousandSeparator || getLocalizedMessage('THOUSAND_SEPARATOR');

    return (
        <NumericFormat
            customInput={TextField}
            onValueChange={(ev) => {
                handleOnChange(ev);
            }}
            decimalSeparator={_decimalSeparator}
            thousandSeparator={_thousandSeparator}
            id={id || path}
            label={getLabel()}
            error={!!errorMessage}
            helperText={helperText}
            value={value || ''}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            onKeyUp={handleOnKeyUp}
            onKeyPress={handleOnKeyPress}
            className={_className}
            variant={getInputVariant()}
            type={type}
            disabled={disabled}
            {...rest}
        />
    );
};

NumberField.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    setPathValue: PropTypes.func,
    errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    setPathIsBlurred: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyUp: PropTypes.func,
    onEnterPressed: PropTypes.func,
    noHelperText: PropTypes.bool,
    multiline: PropTypes.bool,
    variant: PropTypes.string,
    type: PropTypes.string,
    decimalSeparator: PropTypes.string,
    thousandSeparator: PropTypes.string,
    disabled: PropTypes.bool,
    renderErrorMessage: PropTypes.func,
    InputProps: PropTypes.object,
    label: PropTypes.string,
    focusedLabel: PropTypes.string,
};

export default memo(NumberField);
