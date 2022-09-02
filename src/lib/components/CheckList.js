import React, { memo } from 'react';
import { FormControl, List, ListItem, ListItemIcon, ListItemText, FormHelperText, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { isEmptyString } from '../utils/ControlUtils';
import { getClassName } from '../utils/ClassNameUtils';
import Checkbox from './Checkbox';
import useHelperText from '../hooks/useHelperText';
import useSortableOptions from '../hooks/useSortableOptions';

const defaultOptions = [];
const defaultOptionLabel = (option) => option.label;

const CheckList = ({
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
    noHelperText,
    fullWidth,
    labelClassName,
    sortAlphabetically = false,
    disabled = false,
    labelProps,
    renderErrorMessage,
    getOptionDisabled,
    checkboxProps,
    ...rest
}) => {
    const helperText = useHelperText({ errorMessage, noHelperText, renderErrorMessage });
    const sortedOptions = useSortableOptions({ options, sortAlphabetically, getOptionLabel, valueKey });
    const _className = getClassName([className, 'ComfortCheckList']);
    const _labelClassName = getClassName([labelClassName, 'ComfortCheckListLabel']);

    const getValue = () => {
        const defaultValue = [];
        if (!isEmptyString(value)) {
            if (valueKey) {
                return options.filter((option) => value.includes(option[valueKey])) || [];
            }
            return value;
        }
        return defaultValue;
    };

    const handleOnChange = (valueToBeUsed) => {
        let oldValue = getValue();
        let newValue;
        if (valueKey) {
            oldValue = oldValue.map((element) => element[valueKey]);
        }
        if (oldValue.includes(valueToBeUsed)) {
            newValue = oldValue.filter((item) => item !== valueToBeUsed);
        } else {
            newValue = [...oldValue, valueToBeUsed];
        }
        if (setPathValue && onChange) {
            throw new Error('Only one of setPathValue or onChange props should be passed');
        }
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
            className={_className}
            error={!!errorMessage}
            fullWidth={fullWidth}
            onBlur={handleOnBlur}
            {...rest}
        >
            <Typography className={_labelClassName} {...labelProps}>
                {label}
            </Typography>
            <List dense component="div" role="list">
                {sortedOptions.map((option) => {
                    let currentId = null;
                    if (valueKey) {
                        currentId = option[valueKey];
                    } else {
                        currentId = option;
                    }
                    let label = null;
                    if (typeof option === 'string') {
                        label = option;
                    } else {
                        label = getOptionLabel(option);
                    }

                    const labelId = `transfer-list-item-${currentId}-label`;

                    return (
                        <ListItem
                            key={currentId}
                            role="listitem"
                            button
                            onClick={() => handleOnChange(currentId)}
                            disabled={isOptionDisabled(option)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    noLabel
                                    disabled={isOptionDisabled(option)}
                                    value={getValue().indexOf(option) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                    {...checkboxProps}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${label}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
            <FormHelperText error={!!errorMessage}>{helperText}</FormHelperText>
        </FormControl>
    );
};

CheckList.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.array,
    className: PropTypes.string,
    valueKey: PropTypes.string,
    options: PropTypes.array,
    errorMessage: PropTypes.string,
    setPathValue: PropTypes.func,
    setPathIsBlurred: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    getOptionLabel: PropTypes.func,
    noHelperText: PropTypes.bool,
    fullWidth: PropTypes.bool,
    containerClass: PropTypes.string,
    labelClassName: PropTypes.string,
    disabled: PropTypes.bool,
    checkboxProps: PropTypes.object,
    labelProps: PropTypes.object,
    renderErrorMessage: PropTypes.func,
    getOptionDisabled: PropTypes.func,
};

export default memo(CheckList);
