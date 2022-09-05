import React, { memo } from 'react';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import PropTypes from 'prop-types';
import { isEmptyString } from '../utils/ControlUtils';
import { getClassName } from '../utils/ClassNameUtils';
import useHelperText from '../hooks/useHelperText';
import useSortableOptions from '../hooks/useSortableOptions';
import useOnBlur from '../hooks/useOnBlur';

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
    const helperText = useHelperText({ errorMessage, noHelperText, renderErrorMessage });
    const sortedOptions = useSortableOptions({ options, sortAlphabetically, getOptionLabel, valueKey });
    const handleOnBlur = useOnBlur({ setPathIsBlurred, onBlur, id, path });
    const _containerClass = getClassName([containerClass, 'ComfortRadioButton']);
    const _className = getClassName([className, 'ComfortRadio']);
    const _labelClassName = getClassName([labelClassName, 'ComfortRadioLabel']);

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
            <FormHelperText error={!!errorMessage}>{helperText}</FormHelperText>
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
    errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
