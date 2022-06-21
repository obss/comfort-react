import React, { memo, useCallback, useEffect, useState } from 'react';
import { Autocomplete as MuiAutocomplete } from '@mui/material';
import PropTypes from 'prop-types';
import TextField from './TextField';
import { isEmptyString } from '../utils/ControlUtils';
import { getClassName } from '../utils/ClassNameUtils';

const defaultOptions = [];
const defaultOptionLabel = (option) => option.label;
const primitiveRenderOption = (props, option) => {
    return (
        <li {...props} key={option}>
            {option}
        </li>
    );
};

const Autocomplete = ({
    id,
    valueKey,
    getOptionLabel = valueKey ? defaultOptionLabel : undefined,
    path,
    value,
    label,
    className,
    onChange,
    onBlur,
    setPathIsBlurred,
    setPathValue,
    errorMessage,
    noHelperText,
    options = defaultOptions,
    placeholder,
    getSelectedObjectCallback,
    sortAlphabetically = false,
    loading = false,
    disabled = false,
    onInputChange,
    onInputRemove,
    RenderInputComponent,
    renderErrorMessage,
    ...rest
}) => {
    const [sortedOptions, setSortedOptions] = useState(options);
    const _className = getClassName([className, 'ComfortAutocomplete']);

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

    const complexRenderOption = useCallback(
        (props, option) => {
            return (
                <li {...props} key={option[valueKey]}>
                    {getOptionLabel(option)}
                </li>
            );
        },
        [getOptionLabel]
    );

    const getValue = () => {
        const defaultValue = rest.multiple ? [] : null;
        if (!isEmptyString(value)) {
            if (valueKey) {
                if (rest.multiple) {
                    return options.filter((option) => value.includes(option[valueKey])) || [];
                }
                return options.find((option) => option[valueKey] === value) || null;
            }
            return value;
        }
        return defaultValue;
    };

    const handleOnChange = (val) => {
        if (setPathValue && onChange) {
            throw new Error('Only one of setPathValue or onChange props should be passed');
        }
        if (getSelectedObjectCallback) {
            getSelectedObjectCallback(val, val?.[valueKey]);
        }

        if (setPathValue) {
            if (valueKey) {
                if (rest.multiple) {
                    const valToBeReturned = val ? val.map((v) => v[valueKey]) : [];
                    setPathValue(path, valToBeReturned);
                } else {
                    const valToBeReturned = val ? val[valueKey] : null;
                    setPathValue(path, valToBeReturned);
                }
            } else {
                setPathValue(path, val);
            }
        } else if (onChange) {
            if (valueKey) {
                if (rest.multiple) {
                    const valToBeReturned = val ? val.map((v) => v[valueKey]) : [];
                    onChange(valToBeReturned);
                } else {
                    const valToBeReturned = val ? val[valueKey] : null;
                    onChange(valToBeReturned);
                }
            } else {
                onChange(val);
            }
        } else {
            throw new Error('Either one of setPathValue or onChange props should be passed');
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

    const RenderInputFinalComponent = RenderInputComponent ? RenderInputComponent : TextField;

    return (
        <MuiAutocomplete
            id={id || path}
            value={getValue()}
            className={_className}
            onChange={(event, newValue) => handleOnChange(newValue)}
            onBlur={() => handleOnBlur()}
            disabled={disabled}
            renderInput={(params) => {
                return (
                    <RenderInputFinalComponent
                        {...params}
                        noHelperText={noHelperText}
                        errorMessage={errorMessage}
                        renderErrorMessage={renderErrorMessage}
                        path={path}
                        label={label}
                        placeholder={placeholder}
                        onChange={(e) => {
                            if (onInputChange) {
                                onInputChange(e);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (onInputRemove && (e.key === 'Delete' || e.key === 'Backspace')) {
                                onInputRemove();
                            }
                        }}
                    />
                );
            }}
            getOptionLabel={getOptionLabel}
            renderOption={valueKey ? complexRenderOption : primitiveRenderOption}
            options={sortedOptions}
            loading={loading}
            {...rest}
        />
    );
};

Autocomplete.propTypes = {
    id: PropTypes.string,
    valueKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    getOptionLabel: PropTypes.func,
    path: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.string,
    className: PropTypes.string,
    setPathValue: PropTypes.func,
    errorMessage: PropTypes.string,
    setPathIsBlurred: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    options: PropTypes.array,
    noHelperText: PropTypes.bool,
    placeholder: PropTypes.string,
    getSelectedObjectCallback: PropTypes.func,
    sortAlphabetically: PropTypes.bool,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    onInputChange: PropTypes.func,
    onInputRemove: PropTypes.func,
    RenderInputComponent: PropTypes.object,
    renderErrorMessage: PropTypes.func,
};

export default memo(Autocomplete);
