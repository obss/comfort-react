import React from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import NotificationDismissAction from './NotificationDismissAction';

const NotistackProvider = ({ notistackProviderProps, children }) => {
    return (
        <SnackbarProvider
            dense
            maxSnack={5}
            autoHideDuration={3000}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            action={(key) => <NotificationDismissAction id={key} />}
            {...notistackProviderProps}
        >
            {children}
        </SnackbarProvider>
    );
};

NotistackProvider.propTypes = {
    children: PropTypes.node,
};

export default NotistackProvider;
