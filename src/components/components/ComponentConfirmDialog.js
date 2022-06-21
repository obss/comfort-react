import { useState } from 'react';
import { Button, Checkbox, ConfirmDialog, useSnackbar } from '../../lib';
import { Grid, Typography } from '@mui/material';
import jsxToString from 'jsx-to-string';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import CurrentRulesInfo from '../CurrentRulesInfo';
import FormGroup from '@mui/material/FormGroup';

const ComponentConfirmDialog = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [selectedDraggable, setSelectedDraggable] = useState(false);
    const [selectedFullScreen, setSelectedFullScreen] = useState(false);
    const [selectedCustomActionsMessages, setSelectedCustomActionsMessages] = useState(false);
    const [selectedHideCloseButton, setSelectedHideCloseButton] = useState(false);

    const onClose = () => {
        enqueueSnackbar('Dialog Closed');
        setOpen(false);
    };

    const onConfirm = () => {
        enqueueSnackbar('Action Confirmed');
        setOpen(false);
    };

    const onCancel = () => {
        enqueueSnackbar('Action Canceled');
        setOpen(false);
    };

    const confirmDialogElementJsx = (
        <ConfirmDialog
            fullScreen={selectedFullScreen}
            open={open}
            draggable={selectedDraggable}
            onClose={onClose}
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmText={selectedCustomActionsMessages ? 'Custom Confirm Text' : null}
            cancelText={selectedCustomActionsMessages ? 'Custom Cancel Text' : null}
            hideCloseButton={selectedHideCloseButton}
            title={<Typography> Dialog Title </Typography>}
        >
            <Typography>Dialog Content</Typography>
        </ConfirmDialog>
    );

    let currentJsx = jsxToString(confirmDialogElementJsx, {
        displayName: 'ConfirmDialog',
        useFunctionCode: true,
    });

    currentJsx = "import { ConfirmDialog } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper>
            {confirmDialogElementJsx}
            <Button variant={'contained'} onClick={() => setOpen(true)}>
                Open Dialog
            </Button>
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'draggable'}
                            value={selectedDraggable}
                            onChange={(newValue) => {
                                setSelectedDraggable(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'fullScreen'}
                            value={selectedFullScreen}
                            onChange={(newValue) => {
                                setSelectedFullScreen(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable custom actions messages'}
                            value={selectedCustomActionsMessages}
                            onChange={(newValue) => {
                                setSelectedCustomActionsMessages(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'hide close button'}
                            value={selectedHideCloseButton}
                            onChange={(newValue) => {
                                setSelectedHideCloseButton(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
            </Grid>
            <CurrentRulesInfo currentRules={currentJsx} dontStringify={true} header="Current Jsx" />
        </ExampleUsageWrapper>
    );
};

export default ComponentConfirmDialog;
