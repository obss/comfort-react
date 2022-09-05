import React, { memo } from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import { getClassName } from '../utils/ClassNameUtils';
import useHelperText from '../hooks/useHelperText';
import useOnBlur from '../hooks/useOnBlur';

const Checkbox = ({
    id,
    path,
    label,
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
    indeterminate,
    disabled,
    hideErrorMessage = false,
    renderErrorMessage,
    labelProps,
    noLabel = false,
    ...rest
}) => {
    const helperText = useHelperText({ errorMessage, noHelperText, renderErrorMessage });
    const _containerClassName = getClassName([containerClassName, 'ComfortCheckboxIdentifierClass']);
    const _className = getClassName([className, 'ComfortCheckbox']);
    const _inputClassName = getClassName([inputClassName, 'ComfortCheckbox__input']);
    const handleOnBlur = useOnBlur({ setPathIsBlurred, onBlur, id, path });

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

    const checkboxJsx = (
        <MuiCheckbox
            indeterminate={indeterminate}
            checked={getValue()}
            onChange={(e) => handleOnChange(e.target.checked, e)}
            onBlur={handleOnBlur}
            name={label}
            className={_inputClassName}
            {...rest}
        />
    );

    const finalJsx = noLabel ? (
        checkboxJsx
    ) : (
        <div id={id || path} className={_containerClassName}>
            <FormControlLabel
                disabled={disabled}
                label={label}
                className={_className}
                control={checkboxJsx}
                {...labelProps}
            />
            {!hideErrorMessage && <FormHelperText error={!!errorMessage}>{helperText}</FormHelperText>}
        </div>
    );

    return finalJsx;
};

Checkbox.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.bool,
    containerClassName: PropTypes.string,
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    onBlur: PropTypes.func,
    setPathIsBlurred: PropTypes.func,
    onChange: PropTypes.func,
    setPathValue: PropTypes.func,
    errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    noHelperText: PropTypes.bool,
    indeterminate: PropTypes.bool,
    disabled: PropTypes.bool,
    hideErrorMessage: PropTypes.bool,
    renderErrorMessage: PropTypes.func,
    labelProps: PropTypes.object,
    noLabel: PropTypes.bool,
};
export default memo(Checkbox);
