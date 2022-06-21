import React, { memo } from 'react';
import { Switch as MuiSwitch, FormControlLabel, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import { getClassName } from '../utils/ClassNameUtils';

const Switch = ({
    id,
    path,
    label,
    trueLabel,
    falseLabel,
    value,
    containerClassName,
    className,
    inputClassName,
    onBlur,
    setPathIsBlurred,
    onChange,
    setPathValue,
    errorMessage,
    noHelperText,
    disabled,
    hideErrorMessage = false,
    renderErrorMessage,
    labelProps,
    size,
    color,
    noLabel = false,
    ...rest
}) => {
    const _containerClassName = getClassName([containerClassName, 'ComfortSwitchIdentifierClass']);
    const _className = getClassName([className, 'ComfortSwitch']);
    const _inputClassName = getClassName([inputClassName, 'ComfortSwitch__input']);

    const getValue = () => {
        if (value) {
            return value;
        }
        return false;
    };

    const handleOnChange = (val, event) => {
        if (setPathValue && onChange) {
            throw new Error('Only one of setPathValue or onChange props should be passed');
        }
        if (setPathValue) {
            setPathValue(path, val);
        } else if (onChange) {
            onChange(val, event);
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

    const getLabel = () => {
        if (!trueLabel && !falseLabel) {
            return label;
        } else {
            if (value) {
                return trueLabel;
            } else {
                return falseLabel;
            }
        }
    };

    const switchJsx = (
        <MuiSwitch
            checked={getValue()}
            size={size}
            onChange={(e) => handleOnChange(e.target.checked, e)}
            onBlur={handleOnBlur}
            name={label}
            color={color}
            className={_inputClassName}
            {...rest}
        />
    );

    const finalJsx = noLabel ? (
        switchJsx
    ) : (
        <div id={id || path} className={_containerClassName}>
            <FormControlLabel
                disabled={disabled}
                label={getLabel()}
                className={_className}
                control={switchJsx}
                {...labelProps}
            />
            {!hideErrorMessage && <FormHelperText error={!!errorMessage}>{getHelperText()}</FormHelperText>}
        </div>
    );

    return finalJsx;
};

Switch.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,
    label: PropTypes.string,
    trueLabel: PropTypes.string,
    falseLabel: PropTypes.string,
    value: PropTypes.bool,
    containerClassName: PropTypes.string,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    onBlur: PropTypes.func,
    setPathIsBlurred: PropTypes.func,
    onChange: PropTypes.func,
    setPathValue: PropTypes.func,
    errorMessage: PropTypes.string,
    noHelperText: PropTypes.bool,
    disabled: PropTypes.bool,
    hideErrorMessage: PropTypes.bool,
    renderErrorMessage: PropTypes.func,
    labelProps: PropTypes.object,
    noLabel: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium']),
    color: PropTypes.string,
};
export default memo(Switch);
