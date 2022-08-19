import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog } from '../index';
import '../styles/Dialog.css';
import { getClassName } from '../utils/ClassNameUtils';
import useTranslation from '../hooks/useTranslation';

const FormDialog = (props) => {
    const {
        id,
        className,
        draggable,
        title,
        children,
        hideCloseButton,
        onClose,
        onSave,
        onCancel,
        saveText,
        cancelText,
        ...rest
    } = props;
    const { getLocalizedMessage } = useTranslation();
    const _className = getClassName([className, 'ComfortFormDialog']);
    const _saveText = saveText ? saveText : getLocalizedMessage('FORM_DIALOG_SAVE_TEXT');
    const _cancelText = cancelText ? cancelText : getLocalizedMessage('FORM_DIALOG_CANCEL_TEXT');

    return (
        <Dialog
            id={id}
            className={_className}
            onClose={onClose}
            title={title}
            draggable={draggable}
            hideCloseButton={hideCloseButton}
            actions={
                <>
                    <Button variant="outlined" onClick={onCancel}>
                        {_cancelText}
                    </Button>
                    <Button variant="contained" onClick={onSave}>
                        {_saveText}
                    </Button>
                </>
            }
            {...rest}
        >
            {children}
        </Dialog>
    );
};

FormDialog.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    draggable: PropTypes.bool,
    title: PropTypes.node,
    hideCloseButton: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    saveText: PropTypes.string,
    cancelText: PropTypes.string,
};

export default memo(FormDialog);
