import React, { memo, useCallback, useState } from 'react';
import { Autocomplete as MuiAutocomplete } from '@mui/material';
import PropTypes from 'prop-types';
import TextField from './TextField';
import { isEmptyString } from '../utils/ControlUtils';
import { getClassName } from '../utils/ClassNameUtils';
import useTranslation from '../hooks/useTranslation';
import useSortableOptions from '../hooks/useSortableOptions';
import useOnBlur from '../hooks/useOnBlur';

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
    onFocus,
    setPathIsBlurred,
    setPathValue,
    errorMessage,
    noHelperText,
    options = defaultOptions,
    placeholder,
    getSelectedObjectCallback,
    sortAlphabetically = false,
    loading = false,
    loadingText,
    disabled = false,
    onInputChange,
    onInputRemove,
    RenderInputComponent,
    renderErrorMessage,
    focusedLabel,
    ...rest
}) => {
    const { getLocalizedMessage } = useTranslation();
    const [focused, setFocused] = useState(false);
    const sortedOptions = useSortableOptions({ options, sortAlphabetically, getOptionLabel, valueKey });
    const handleOnBlur = useOnBlur({ setPathIsBlurred, onBlur, id, path, setFocused });
    const _className = getClassName([className, 'ComfortAutocomplete']);
    const _loadingText = loadingText || getLocalizedMessage('AUTOCOMPLETE_LOADING_TEXT');

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

    const handleOnChange = (event, val) => {
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

    const handleOnFocus = (e) => {
        setFocused(true);
        if (onFocus) {
            onFocus(e);
        }
    };

    const getLabel = () => {
        const hasValue = Array.isArray(value) ? value.length > 0 : !isEmptyString(value);
        if (focused || hasValue) {
            return focusedLabel || label;
        }
        return label;
    };

    const RenderInputFinalComponent = RenderInputComponent ? RenderInputComponent : TextField;

    return (
        <MuiAutocomplete
            id={id || path}
            value={getValue()}
            className={_className}
            onChange={handleOnChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            disabled={disabled}
            renderInput={(params) => {
                return (
                    <RenderInputFinalComponent
                        {...params}
                        noHelperText={noHelperText}
                        errorMessage={errorMessage}
                        renderErrorMessage={renderErrorMessage}
                        path={path}
                        label={getLabel()}
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
            loadingText={_loadingText}
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
    errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    setPathIsBlurred: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    options: PropTypes.array,
    noHelperText: PropTypes.bool,
    placeholder: PropTypes.string,
    getSelectedObjectCallback: PropTypes.func,
    sortAlphabetically: PropTypes.bool,
    loading: PropTypes.bool,
    loadingText: PropTypes.node,
    disabled: PropTypes.bool,
    onInputChange: PropTypes.func,
    onInputRemove: PropTypes.func,
    RenderInputComponent: PropTypes.object,
    renderErrorMessage: PropTypes.func,
    focusedLabel: PropTypes.string,
};

export default memo(Autocomplete);
