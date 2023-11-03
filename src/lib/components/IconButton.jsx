import React, { memo } from 'react';
import { CircularProgress, IconButton as MuiIconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { getClassName } from '../utils/ClassNameUtils';

const DEFAULT_CIRCULAR_PROGRESS_PROPS = { color: 'inherit', size: 24 };

const IconButton = ({ children, disabled, loading, className = '', circularProgressProps, ...rest }) => {
    const _className = getClassName([className, 'ComfortIconButton']);
    const _circularProgressProps = { ...DEFAULT_CIRCULAR_PROGRESS_PROPS, ...circularProgressProps };
    const childrenJsx = loading ? <CircularProgress {..._circularProgressProps} /> : children;
    const disabledOrLoading = disabled || loading;
    return (
        <MuiIconButton className={_className} disabled={disabledOrLoading} {...rest}>
            {childrenJsx}
        </MuiIconButton>
    );
};

IconButton.propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    className: PropTypes.string,
    circularProgressProps: PropTypes.object,
};

export default memo(IconButton);
