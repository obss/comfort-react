import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { IMaskInput } from 'react-imask';
import { getClassName } from '../utils/ClassNameUtils';

const DEFAULT_VARIANT = 'outlined';

const MaskField = ({
    id,
    path,
    value,
    maskFormat,
    definitions,
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
    blocks,
    renderErrorMessage,
    InputComponent,
    InputProps,
    ...rest
}) => {
    const _className = getClassName([className, 'ComfortMaskField']);

    const handleOnChange = (val) => {
        if (val !== value) {
            if (setPathValue && onChange) {
                throw new Error('Only one of setPathValue or onChange props should be passed');
            }
            if (setPathValue) {
                setPathValue(path, val);
            } else if (onChange) {
                onChange(val);
            }
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

    const InputFinalComponent = InputComponent ? InputComponent : TextMaskCustom;

    return (
        <TextField
            id={id || path}
            error={!!errorMessage}
            helperText={getHelperText()}
            value={value || ''}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            onKeyUp={handleOnKeyUp}
            onKeyPress={handleOnKeyPress}
            className={_className}
            variant={getInputVariant()}
            type={type}
            InputProps={{
                inputComponent: InputFinalComponent,
                inputProps: {
                    mask: maskFormat,
                    definitions,
                    blocks,
                },
                ...InputProps,
            }}
            {...rest}
        />
    );
};

const TextMaskCustom = forwardRef((props, ref) => {
    const {
        onChange,
        mask,
        definitions = {
            '#': /[1-9]/,
        },
        blocks,
        ...other
    } = props;
    return (
        <IMaskInput
            {...other}
            mask={mask}
            definitions={definitions}
            blocks={blocks}
            inputRef={ref}
            onAccept={(value) => onChange(value)}
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    onChange: PropTypes.func.isRequired,
    handleOnBlur: PropTypes.func,
    handleOnKeyUp: PropTypes.func,
    handleOnKeyPress: PropTypes.func,
    mask: PropTypes.string.isRequired,
    definitions: PropTypes.object,
    blocks: PropTypes.object,
};

MaskField.propTypes = {
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
    maskFormat: PropTypes.string.isRequired,
    definitions: PropTypes.object,
    blocks: PropTypes.object,
    renderErrorMessage: PropTypes.func,
    InputComponent: PropTypes.object,
    InputProps: PropTypes.object,
};

export default memo(MaskField);
