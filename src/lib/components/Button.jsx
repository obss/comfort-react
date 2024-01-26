import React, { memo } from 'react';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { getClassName } from '../utils/ClassNameUtils';

const Button = ({ children, className = '', ...rest }) => {
    const _className = getClassName([className, 'ComfortButton']);
    return (
        <LoadingButton className={_className} {...rest}>
            {children}
        </LoadingButton>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default memo(Button);
