import { useState } from 'react';
import { Button, Checkbox, useSnackbar } from '../../lib';
import { Grid } from '@mui/material';
import jsxToString from 'jsx-to-string';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import CurrentRulesInfo from '../CurrentRulesInfo';
import FormGroup from '@mui/material/FormGroup';
import Dialog from '../../lib/components/Dialog';

const ComponentDialog = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [secondaryDialogOpen, setSecondartDialogOpen] = useState(false);
    const [selectedDraggable, setSelectedDraggable] = useState(false);
    const [selectedFullScreen, setSelectedFullScreen] = useState(false);
    const [selectedHideCloseButton, setSelectedHideCloseButton] = useState(false);

    const onClose = () => {
        enqueueSnackbar('Dialog Closed');
        setOpen(false);
    };

    const onCloseSecondary = () => {
        enqueueSnackbar('Secondary Dialog Closed');
        setSecondartDialogOpen(false);
    };

    const openSecondaryDialog = () => {
        setSecondartDialogOpen(true);
    };

    const draggableDialogElementJsx = (
        <Dialog
            fullScreen={selectedFullScreen}
            open={open}
            draggable={selectedDraggable}
            onClose={onClose}
            title="Dialog Title"
            hideCloseButton={selectedHideCloseButton}
            actions={<Button onClick={onClose}>Close Dialog</Button>}
        >
            <div>Dialog Content</div>
            <Button variant={'contained'} onClick={openSecondaryDialog}>
                Open Another Dialog
            </Button>
        </Dialog>
    );

    const draggableSecondaryDialogElementJsx = (
        <Dialog
            fullScreen={selectedFullScreen}
            open={secondaryDialogOpen}
            draggable={selectedDraggable}
            onClose={onCloseSecondary}
            title="Another Dialog Title"
            hideCloseButton={selectedHideCloseButton}
            actions={<Button onClick={onCloseSecondary}>Close Dialog</Button>}
        >
            <div>Dialog Another Content</div>
        </Dialog>
    );

    let currentJsx = jsxToString(draggableDialogElementJsx, {
        displayName: 'Dialog',
        useFunctionCode: true,
        keyValueOverride: {
            actions: '<Button onClick={onClose}>Close Dialog</Button>',
        },
    })
        .replace('<[object Object]', '<Button')
        .replace('</[object Object]>', '</Button>');

    currentJsx = "import { Dialog } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper>
            {draggableDialogElementJsx}
            {draggableSecondaryDialogElementJsx}
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

export default ComponentDialog;
