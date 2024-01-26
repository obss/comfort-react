import React from 'react';
import PropTypes from 'prop-types';
import { Close as CloseIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import IconButton from '../components/IconButton';

const NotificationDismissAction = ({ id }) => {
    const { closeSnackbar } = useSnackbar();
    return (
        <IconButton
            size="small"
            color="inherit"
            onClick={() => closeSnackbar(id)}
            className={'comfort-close-notification-button'}
        >
            <CloseIcon width={24} height={24} />
        </IconButton>
    );
};

NotificationDismissAction.propTypes = {
    id: PropTypes.any,
};

export default NotificationDismissAction;
