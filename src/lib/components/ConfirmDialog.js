import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog } from '../index';
import '../styles/Dialog.css';
import { getClassName } from '../utils/ClassNameUtils';
import useTranslation from '../hooks/useTranslation';

const ConfirmDialog = (props) => {
    const {
        id,
        className,
        draggable,
        title,
        children,
        hideCloseButton,
        onClose,
        onConfirm,
        onCancel,
        confirmText,
        cancelText,
        ...rest
    } = props;
    const { getLocalizedMessage } = useTranslation();
    const _className = getClassName([className, 'ComfortConfirmDialog']);
    const _confirmText = confirmText ? confirmText : getLocalizedMessage('CONFIRM_DIALOG_CONFIRM_TEXT');
    const _cancelText = cancelText ? cancelText : getLocalizedMessage('CONFIRM_DIALOG_CANCEL_TEXT');

    return (
        <Dialog
            id={id}
            className={_className}
            onClose={onClose}
            draggable={draggable}
            hideCloseButton={hideCloseButton}
            title={title}
            actions={
                <>
                    <Button variant="outlined" onClick={onCancel}>
                        {_cancelText}
                    </Button>
                    <Button variant="contained" onClick={onConfirm}>
                        {_confirmText}
                    </Button>
                </>
            }
            {...rest}
        >
            {children}
        </Dialog>
    );
};

ConfirmDialog.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    draggable: PropTypes.bool,
    title: PropTypes.element,
    hideCloseButton: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
};

export default memo(ConfirmDialog);
