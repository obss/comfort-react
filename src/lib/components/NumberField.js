import PropTypes from 'prop-types';
import React, { forwardRef, memo } from 'react';
import { TextField } from '@mui/material';
import NumberFormat from 'react-number-format';
import { getClassName } from '../utils/ClassNameUtils';
import useTranslation from '../hooks/useTranslation';

const DEFAULT_VARIANT = 'outlined';

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
    ...rest
}) => {
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
        if (setPathIsBlurred && onBlur) {
            throw new Error('Only one of setPathIsBlurred or onBlur props should be passed');
        }
        if (setPathIsBlurred) {
            setPathIsBlurred(id || path);
        } else if (onBlur) {
            onBlur();
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

    const getInputVariant = () => {
        return variant || DEFAULT_VARIANT;
    };

    return (
        <TextField
            id={id || path}
            error={!!errorMessage}
            helperText={getHelperText()}
            value={value || ''}
            onChange={(e) => handleOnChange(e)}
            onBlur={() => handleOnBlur()}
            onKeyUp={(e) => handleOnKeyUp(e)}
            onKeyPress={(e) => handleOnKeyPress(e)}
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
};

export default memo(NumberField);
