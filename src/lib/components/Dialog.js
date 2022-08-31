import React, { memo, useRef, useState } from 'react';
import { Box, Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle, Grid, Paper } from '@mui/material';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import { Close } from '@mui/icons-material';
import { IconButton } from '../index';
import '../styles/Dialog.css';
import { getClassName } from '../utils/ClassNameUtils';

const getUniqueId = () => `${Math.random().toString().slice(5)}`.replace('.', '');

const Dialog = (props) => {
    const { id, draggable, className, title, actions, children, hideCloseButton, onClose, ...rest } = props;
    const [draggableHandleId] = useState(`draggable-title-${getUniqueId()}`);
    const _className = getClassName([className, 'ComfortDialog']);
    const _titleClassName = getClassName([draggable ? 'ComfortDialogDraggableTitle' : '', 'ComfortDialogTitle']);

    return (
        <MuiDialog
            id={id}
            className={_className}
            aria-labelledby={draggableHandleId}
            onClose={onClose}
            PaperComponent={draggable ? PaperComponent : null}
            PaperProps={draggable ? { handleId: draggableHandleId } : {}}
            {...rest}
        >
            <DialogTitle className={_titleClassName}>
                <Grid container alignItems={'center'}>
                    <Box sx={{ flexGrow: 1 }}>{title}</Box>
                    {!hideCloseButton && (
                        <IconButton className={'ComfortDialogCloseButton'} onClick={onClose}>
                            <Close />
                        </IconButton>
                    )}
                </Grid>
            </DialogTitle>
            <DialogContent className={'ComfortDialogContent'}>{children}</DialogContent>
            <DialogActions>{actions}</DialogActions>
        </MuiDialog>
    );
};

function PaperComponent(props) {
    const { handleId, ...rest } = props;
    const nodeRef = useRef(null);
    return (
        <Draggable nodeRef={nodeRef} handle={`#${handleId}`} cancel={'button'}>
            <Paper ref={nodeRef} {...rest} />
        </Draggable>
    );
}

Dialog.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    draggable: PropTypes.bool,
    title: PropTypes.node,
    actions: PropTypes.node,
    hideCloseButton: PropTypes.bool,
    onClose: PropTypes.func,
};

export default memo(Dialog);
