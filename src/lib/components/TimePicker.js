import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { IMask } from 'react-imask';
import MaskField from './MaskField';
import { getClassName } from '../utils/ClassNameUtils';
import useOnBlur from '../hooks/useOnBlur';

const TimePicker = ({
    id,
    path,
    value,
    className,
    onChange,
    onBlur,
    setPathIsBlurred,
    setPathValue,
    isSecond,
    ...rest
}) => {
    const _className = getClassName([className, 'ComfortTimePicker']);

    const completeTimeValue = () => {
        const suffix = isSecond ? ':00' : '';
        if (value) {
            if (value.length === 1) {
                handleOnChange(`0${value}:00${suffix}`);
            } else if (value.length === 2) {
                handleOnChange(`${value}:00${suffix}`);
            } else if (value.length === 4) {
                const [hour, minute] = value.split(':');
                handleOnChange(`${hour}:0${minute}${suffix}`);
            } else if (isSecond) {
                if (value.length === 6) {
                    handleOnChange(`${value}${suffix}`);
                } else if (value.length === 7) {
                    const [hour, minute, second] = value.split(':');
                    handleOnChange(`${hour}:${minute}:0${second}`);
                }
            }
        }
    };

    const handleOnBlur = useOnBlur({ setPathIsBlurred, onBlur, id, path, completeTimeValue });

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

    const getMask = () => {
        if (isSecond) {
            return 'HH:mm:ss';
        }
        return 'HH:mm';
    };

    return (
        <MaskField
            id={id || path}
            className={_className}
            value={getValue()}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            maskFormat={getMask()}
            blocks={{
                HH: {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 23,
                },
                mm: {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 59,
                },
                ss: {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 59,
                },
            }}
            {...rest}
        />
    );
};

TimePicker.propTypes = {
    id: PropTypes.string,
    path: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    className: PropTypes.string,
    setPathValue: PropTypes.func,
    setPathIsBlurred: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    isSecond: PropTypes.bool,
};

export default memo(TimePicker);
