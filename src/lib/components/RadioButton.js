import React, { memo, useEffect, useState } from 'react';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import PropTypes from 'prop-types';
import { isEmptyString } from '../utils/ControlUtils';
import { getClassName } from '../utils/ClassNameUtils';

const defaultOptions = [];
const defaultOptionLabel = (option) => option.label;

const RadioButton = ({
    id,
    label,
    path,
    value,
    options = defaultOptions,
    valueKey,
    getOptionLabel = valueKey ? defaultOptionLabel : undefined,
    className,
    errorMessage,
    setPathValue,
    setPathIsBlurred,
    onBlur,
    onChange,
    row = false,
    noHelperText,
    fullWidth,
    containerClass,
    labelClassName,
    sortAlphabetically = false,
    disabled = false,
    radioProps,
    labelProps,
    renderErrorMessage,
    getOptionDisabled,
    ...rest
}) => {
    const [sortedOptions, setSortedOptions] = useState(options);
    const _containerClass = getClassName([containerClass, 'ComfortRadioButton']);
    const _className = getClassName([className, 'ComfortRadio']);
    const _labelClassName = getClassName([labelClassName, 'ComfortRadioLabel']);

    useEffect(() => {
        if (sortAlphabetically) {
            const copyOptions = [...options];
            if (valueKey) {
                copyOptions.sort((a, b) => getOptionLabel(a).toString().localeCompare(getOptionLabel(b).toString()));
            } else {
                copyOptions.sort((a, b) => a.toString().localeCompare(b.toString()));
            }
            setSortedOptions(copyOptions);
        } else {
            setSortedOptions([...options]);
        }
    }, [options, sortAlphabetically, getOptionLabel, valueKey]);

    const getValue = () => {
        if (!isEmptyString(value)) {
            return value;
        }
        return null;
    };

    const handleOnChange = (value) => {
        if (setPathValue && onChange) {
            throw new Error('Only one of setPathValue or onChange props should be passed');
        }
        if (setPathValue) {
            setPathValue(path, value);
        } else if (onChange) {
            onChange(value);
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

    const getRadioInputValue = (option) => {
        if (valueKey) {
            return option[valueKey];
        }
        return option;
    };

    const isOptionDisabled = (option) => {
        if (disabled) {
            return true;
        }
        if (getOptionDisabled) {
            return getOptionDisabled(option);
        }
        return false;
    };

    return (
        <FormControl
            id={id || path}
            component="fieldset"
            className={_containerClass}
            error={!!errorMessage}
            fullWidth={fullWidth}
        >
            <FormLabel component="legend" className={_labelClassName}>
                {label}
            </FormLabel>
            <RadioGroup
                aria-label={label}
                row={row}
                value={getValue()}
                onChange={(e) => handleOnChange(e.target.value)}
                {...rest}
            >
                {sortedOptions.map((option) => (
                    <FormControlLabel
                        key={getRadioInputValue(option)}
                        value={getRadioInputValue(option)}
                        onBlur={handleOnBlur}
                        className={_className}
                        control={<Radio {...radioProps} />}
                        label={getOptionLabel ? getOptionLabel(option) : option}
                        disabled={isOptionDisabled(option)}
                        {...labelProps}
                    />
                ))}
            </RadioGroup>
            <FormHelperText error={!!errorMessage}>{getHelperText()}</FormHelperText>
        </FormControl>
    );
};

RadioButton.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    className: PropTypes.string,
    valueKey: PropTypes.string,
    options: PropTypes.array,
    errorMessage: PropTypes.string,
    setPathValue: PropTypes.func,
    setPathIsBlurred: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    getOptionLabel: PropTypes.func,
    row: PropTypes.bool,
    noHelperText: PropTypes.bool,
    fullWidth: PropTypes.bool,
    containerClass: PropTypes.string,
    labelClassName: PropTypes.string,
    disabled: PropTypes.bool,
    radioProps: PropTypes.object,
    labelProps: PropTypes.object,
    renderErrorMessage: PropTypes.func,
    getOptionDisabled: PropTypes.func,
};

export default memo(RadioButton);
