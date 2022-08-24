import PropTypes from 'prop-types';
import React, { forwardRef, memo, useState } from 'react';
import { TextField } from '@mui/material';
import NumberFormat from 'react-number-format';
import { getClassName } from '../utils/ClassNameUtils';
import useTranslation from '../hooks/useTranslation';
import useHelperText from '../hooks/useHelperText';
import { DEFAULT_VARIANT } from '../constants/constants';

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
    prefix,
    thousandSeparator,
    decimalSeparator,
    disabled,
    renderErrorMessage,
    InputProps,
    label,
    focusedLabel,
    ...rest
}) => {
    const [focused, setFocused] = useState(false);
    const helperText = useHelperText({ errorMessage, noHelperText, renderErrorMessage });

    const _className = getClassName([className, 'ComfortNumberField']);

    const handleOnChange = (val) => {
        if (setPathValue && onChange) {
            throw new Error('Only one of setPathValue or onChange props should be passed');
        }
        if (setPathValue) {
            setPathValue(path, val.value);
        } else if (onChange) {
            onChange(val.value);
        }
    };

    const handleOnBlur = () => {
        setFocused(false);
        if (setPathIsBlurred && onBlur) {
            throw new Error('Only one of setPathIsBlurred or onBlur props should be passed');
        }
        if (setPathIsBlurred) {
            setPathIsBlurred(id || path);
        } else if (onBlur) {
            onBlur();
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

    return (
        <TextField
            id={id || path}
            label={getLabel()}
            error={!!errorMessage}
            helperText={helperText}
            value={value || ''}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            onKeyUp={handleOnKeyUp}
            onKeyPress={handleOnKeyPress}
            className={_className}
            variant={getInputVariant()}
            type={type}
            disabled={disabled}
            {...rest}
            InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: {
                    prefix,
                    decimalSeparator,
                    thousandSeparator,
                },
                ...InputProps,
            }}
        />
    );
};

const NumberFormatCustom = forwardRef((props, ref) => {
    const { onChange, decimalSeparator, thousandSeparator, prefix, ...other } = props;
    const { getLocalizedMessage } = useTranslation();

    const _decimalSeparator = decimalSeparator || getLocalizedMessage('DECIMAL_SEPARATOR');
    const _thousandSeparator = thousandSeparator || getLocalizedMessage('THOUSAND_SEPARATOR');

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(value) => {
                onChange(value);
            }}
            decimalSeparator={_decimalSeparator}
            thousandSeparator={_thousandSeparator}
            isNumericString
            prefix={prefix}
        />
    );
});

NumberFormatCustom.propTypes = {
    onChange: PropTypes.func.isRequired,
    decimalSeparator: PropTypes.string,
    thousandSeparator: PropTypes.string,
    prefix: PropTypes.string,
};

NumberField.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    setPathValue: PropTypes.func,
    errorMessage: PropTypes.string,
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
    prefix: PropTypes.string,
    disabled: PropTypes.bool,
    renderErrorMessage: PropTypes.func,
    InputProps: PropTypes.object,
    label: PropTypes.string,
    focusedLabel: PropTypes.string,
};

export default memo(NumberField);
