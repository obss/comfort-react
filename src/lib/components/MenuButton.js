import React, { memo, useState } from 'react';
import Menu from '@mui/material/Menu';
import PropTypes from 'prop-types';
import Button from './Button';
import IconButton from './IconButton';
import { getClassName } from '../utils/ClassNameUtils';

const MenuButton = ({
    buttonProps,
    children,
    className = '',
    isIconButton,
    menuProps,
    menuChildren,
    onOpen,
    onClose,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const _className = getClassName([className, 'ComfortMenuButton']);
    const ButtonComponent = isIconButton ? IconButton : Button;
    const open = Boolean(anchorEl);

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
        <div className={_className}>
            <ButtonComponent onClick={handleClick} {...buttonProps}>
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
};

export default memo(MenuButton);
