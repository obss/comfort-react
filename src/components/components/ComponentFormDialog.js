import { useState } from 'react';
import { Button, Checkbox, FormDialog, TextField, useSnackbar, useValidatableForm } from '../../lib';
import { Grid, Typography } from '@mui/material';
import jsxToString from 'jsx-to-string';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import CurrentRulesInfo from '../CurrentRulesInfo';
import FormGroup from '@mui/material/FormGroup';

const initialFormData = {
    val: '',
};

const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }] }];

const ComponentFormDialog = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [selectedDraggable, setSelectedDraggable] = useState(false);
    const [selectedFullScreen, setSelectedFullScreen] = useState(false);
    const [selectedCustomActionsMessages, setSelectedCustomActionsMessages] = useState(false);
    const [selectedHideCloseButton, setSelectedHideCloseButton] = useState(false);
    const { setPathValue, getError, getValue, isValid, resetForm } = useValidatableForm({
        rules,
        initialFormData,
    });

    const onClose = () => {
        setOpen(false);
        enqueueSnackbar('Dialog Closed');
        resetForm();
        setPathValue('val', '');
    };

    const onSave = () => {
        if (isValid) {
            setOpen(false);
            enqueueSnackbar(`Saved value: ${getValue('val')}`);
            resetForm();
            setPathValue('val', '');
        }
    };

    const onCancel = () => {
        setOpen(false);
        enqueueSnackbar('Action Canceled');
        resetForm();
        setPathValue('val', '');
    };

    const formDialogElementJsx = (
        <FormDialog
            fullScreen={selectedFullScreen}
            open={open}
            draggable={selectedDraggable}
            onClose={onClose}
            onSave={onSave}
            onCancel={onCancel}
            saveText={selectedCustomActionsMessages ? 'Custom Save Text' : null}
            cancelText={selectedCustomActionsMessages ? 'Custom Cancel Text' : null}
            hideCloseButton={selectedHideCloseButton}
            title={<Typography> Dialog Title </Typography>}
        >
            <TextField
                label={'Input'}
                fullWidth
                value={getValue('val')}
                onChange={(value) => setPathValue('val', value)}
                errorMessage={getError('val')}
            />
        </FormDialog>
    );

    let currentJsx = jsxToString(formDialogElementJsx, {
        displayName: 'FormDialog',
        useFunctionCode: true,
    });

    currentJsx = "import { FormDialog } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper>
            {formDialogElementJsx}
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

export default ComponentFormDialog;
