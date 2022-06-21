import React, { useState, memo } from 'react';
import { TextField as MuiTextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getClassName } from '../utils/ClassNameUtils';
import { isNullOrUndefined } from '../utils/ControlUtils';

const DEFAULT_VARIANT = 'outlined';

const TextField = ({
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
    multiline,
    type,
    variant,
    renderErrorMessage,
    limitClassName,
    hideCounter,
    hidePasswordVisibility,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const _className = getClassName([className, 'ComfortTextField']);
    const _limitClassName = getClassName([limitClassName, 'ComfortTextFieldLimit']);

    const handleOnChange = (val) => {
        if (setPathValue && onChange) {
            throw new Error('Only one of setPathValue or onChange props should be passed');
        }
        if (type === 'number' && !/^-?[0-9.]*$/.test(val)) {
            return;
        }
        if (setPathValue) {
            setPathValue(path, val);
        } else if (onChange) {
            onChange(val);
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
        if (type === 'number' && e.key === '+') {
            e.preventDefault();
        }
        if (type === 'number' && e.key === '-') {
            e.preventDefault();
            if (value > 0) {
                handleOnChange(`-${value}`);
            } else if (value < 0) {
                handleOnChange(value.split('-')[1]);
            }
        }
    };

    const getEmptyHelperText = () => {
        if (noHelperText) {
            return '';
        }
        return ' ';
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const getInputType = () => {
        if (type === 'number') {
            return 'tel';
        }
        if (type === 'password') {
            return showPassword ? 'text' : 'password';
        }
        return type;
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
        <>
            <MuiTextField
                id={id || path}
                error={!!errorMessage}
                helperText={getHelperText()}
                value={isNullOrUndefined(value) ? '' : value}
                onChange={(e) => handleOnChange(e.target.value)}
                onBlur={handleOnBlur}
                onKeyUp={(e) => handleOnKeyUp(e)}
                onKeyPress={(e) => handleOnKeyPress(e)}
                className={_className}
                multiline={multiline}
                variant={getInputVariant()}
                type={getInputType()}
                InputProps={
                    type === 'password' && !hidePasswordVisibility
                        ? {
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton
                                          aria-label="toggle password visibility"
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                          edge="end"
                                          sx={{ padding: '0', margin: '0 !important' }}
                                      >
                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                  </InputAdornment>
                              ),
                          }
                        : undefined
                }
                {...rest}
            />
            {!rest.disabled && rest.inputProps?.maxLength && multiline && !hideCounter && (
                <Typography className={_limitClassName}>
                    {value ? rest.inputProps.maxLength - value.length : rest.inputProps.maxLength}
                </Typography>
            )}
        </>
    );
};

TextField.propTypes = {
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
    type: PropTypes.string,
    maxLength: PropTypes.number,
    variant: PropTypes.string,
    renderErrorMessage: PropTypes.func,
    limitClassName: PropTypes.string,
    hideCounter: PropTypes.bool,
    hidePasswordVisibility: PropTypes.bool,
};

export default memo(TextField);
