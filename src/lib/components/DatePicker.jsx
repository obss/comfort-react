import React, { memo, useState } from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import PropTypes from 'prop-types';
import { getClassName } from '../utils/ClassNameUtils';
import useTranslation from '../hooks/useTranslation';
import useOnBlur from '../hooks/useOnBlur';
import useHelperText from '../hooks/useHelperText';

const DatePicker = ({
    id,
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
    renderedTextFieldSx,
    fullWidth,
    placeholder,
    inputProps,
    format,
    inputFormat,
    okText,
    cancelText,
    variant,
    renderErrorMessage,
    focusedLabel,
    ...rest
}) => {
    const [focused, setFocused] = useState(false);
    const helperText = useHelperText({ errorMessage, noHelperText, renderErrorMessage });
    const { getLocalizedMessage } = useTranslation();
    const _className = getClassName([className, 'ComfortDatePicker']);
    const _format = format || inputFormat || getLocalizedMessage('DATE_PICKER_INPUT_FORMAT');
    const _okText = okText || getLocalizedMessage('DATE_PICKER_OK_TEXT');
    const _cancelText = cancelText || getLocalizedMessage('DATE_PICKER_CANCEL_TEXT');
    const handleOnBlur = useOnBlur({ setPathIsBlurred, onBlur, id, path, setFocused });

    const getValue = () => {
        const defaultValue = null;
        if (value) {
            return value;
        }
        return defaultValue;
    };

    const handleOnChange = (val) => {
        if (setPathValue && onChange) {
            throw new Error('Only one of setPathValue or onChange props should be passed');
        }
        if (setPathValue) {
            setPathValue(path, val);
        } else if (onChange) {
            onChange(val);
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
        if (focused || value) {
            return focusedLabel || label;
        }
        return label;
    };

    return (
        <MuiDatePicker
            id={id || path}
            className={_className}
            label={getLabel()}
            value={getValue()}
            onChange={handleOnChange}
            inputProps={{ placeholder: placeholder, ...inputProps }}
            slotProps={{
                textField: {
                    onBlur: handleOnBlur,
                    onFocus: handleOnFocus,
                    error: !!errorMessage,
                    helperText: helperText,
                    path: path,
                    sx: renderedTextFieldSx,
                    fullWidth: fullWidth,
                    variant: variant,
                },
            }}
            format={_format}
            okText={_okText}
            cancelText={_cancelText}
            {...rest}
        />
    );
};

DatePicker.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    label: PropTypes.string,
    className: PropTypes.string,
    setPathValue: PropTypes.func,
    errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    setPathIsBlurred: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    noHelperText: PropTypes.bool,
    renderedTextFieldSx: PropTypes.object,
    fullWidth: PropTypes.bool,
    placeholder: PropTypes.string,
    inputProps: PropTypes.object,
    format: PropTypes.string,
    inputFormat: PropTypes.string,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    variant: PropTypes.string,
    renderErrorMessage: PropTypes.func,
    focusedLabel: PropTypes.string,
};

export default memo(DatePicker);
