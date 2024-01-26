import React, { memo, useEffect, useId, useState } from 'react';
import { Menu } from '@mui/material';
import PropTypes from 'prop-types';
import Button from './Button';
import IconButton from './IconButton';
import { getClassName } from '../utils/ClassNameUtils';
import { isNullOrUndefined } from '../utils/ControlUtils';

const MenuButton = ({
    buttonProps,
    children,
    className = '',
    isIconButton,
    menuProps,
    menuChildren,
    onOpen,
    onClose,
    open: openProp,
    ...rest
}) => {
    const buttonId = useId();
    const [anchorEl, setAnchorEl] = useState(null);
    const _className = getClassName([className, 'ComfortMenuButton']);
    const ButtonComponent = isIconButton ? IconButton : Button;
    const open = Boolean(anchorEl);

    useEffect(() => {
        const buttonElement = document.getElementById(buttonId);
        if (buttonElement && !isNullOrUndefined(openProp)) {
            if (openProp) {
                setAnchorEl(buttonElement);
            } else {
                setAnchorEl(null);
            }
        }
    }, [openProp, buttonId]);

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        if (onOpen) {
            onOpen(event);
        }
    };

    const handleClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
        if (onClose) {
            onClose(event);
        }
    };

    return (
        <div className={_className} {...rest}>
            <ButtonComponent id={buttonId} onClick={handleClick} {...buttonProps}>
                {children}
            </ButtonComponent>

            <Menu
                className="ComfortMenuButtonMenu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                {...menuProps}
            >
                {menuChildren}
            </Menu>
        </div>
    );
};

MenuButton.propTypes = {
    buttonProps: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    isIconButton: PropTypes.bool,
    menuProps: PropTypes.object,
    menuChildren: PropTypes.node,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    open: PropTypes.bool,
};

export default memo(MenuButton);
