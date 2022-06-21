import { Autocomplete, Checkbox, TextField, useSnackbar } from '../../lib';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { pink } from '@mui/material/colors';
import CurrentComponentApiInfo from '../CurrentComponentApiInfo';
import { customErrorMessageRenderer } from './CustomErrorMessageRenderer';
import { customErrorMessageJsx } from '../../constants/JsxConstants';
import { useValidatableForm } from 'react-validatable-form';

const CHECKBOX_SIZE = ['medium', 'small', 'large'];
const LABEL_PLACEMENT = ['end', 'bottom', 'start', 'top'];
const CUSTOM_THEME = {
    color: pink[800],
    '&.Mui-checked': {
        color: pink[600],
    },
};

const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }] }];

const ComponentCheckbox = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [selectedLabelPlacement, setSelectedLabelPlacement] = useState(LABEL_PLACEMENT[0]);
    const [selectedCheckboxSize, setSelectedCheckboxSize] = useState(CHECKBOX_SIZE[0]);
    const [value, setValue] = useState(true);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedIndeterminate, setSelectedIndeterminate] = useState(false);
    const [selectedBlur, setSelectedBlur] = useState(false);
    const [selectedCustomStyle, setSelectedCustomStyle] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [selectedRenderErrorMessage, setSelectedRenderErrorMessage] = useState(false);
    const [enableUseValidatableForm, setEnableUseValidatableForm] = useState(false);
    const { setPathValue, setPathIsBlurred, getValue, getError } = useValidatableForm({
        rules,
    });

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleBlur = () => {
        enqueueSnackbar('Checkbox is blurred', { variant: 'info' });
    };

    const checkboxElementJsx = (
        <Checkbox
            label="Checkbox"
            path="val"
            value={!enableUseValidatableForm ? value : getValue('val')}
            onChange={!enableUseValidatableForm ? handleChange : null}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
            errorMessage={enableUseValidatableForm ? getError('val') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            disabled={selectedDisabled}
            indeterminate={selectedIndeterminate}
            labelProps={{
                labelPlacement: selectedLabelPlacement ? selectedLabelPlacement : 'end',
            }}
            sx={{
                ...(selectedCustomStyle ? CUSTOM_THEME : null),
                '& .MuiSvgIcon-root': {
                    fontSize: selectedCheckboxSize === 'small' ? 20 : selectedCheckboxSize === 'medium' ? 28 : 36,
                },
            }}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
        />
    );

    let currentJsx = jsxToString(checkboxElementJsx, {
        displayName: 'Checkbox',
        useFunctionCode: true,
        keyValueOverride: {
            renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
        },
    });
    currentJsx = "import { Checkbox } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper header="Checkbox" codeUrl={'components/components/ComponentCheckbox.js'}>
            {checkboxElementJsx}
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedLabelPlacement}
                        options={LABEL_PLACEMENT}
                        onChange={(val) => {
                            setSelectedLabelPlacement(val);
                        }}
                        label="label placement"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedCheckboxSize}
                        options={CHECKBOX_SIZE}
                        onChange={(val) => {
                            setSelectedCheckboxSize(val);
                        }}
                        label="checkbox size"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            value={selectedDisabled}
                            onChange={(newValue) => {
                                setSelectedDisabled(newValue);
                            }}
                            label="disabled"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            value={selectedIndeterminate}
                            onChange={(newValue) => {
                                setSelectedIndeterminate(newValue);
                            }}
                            label="indeterminate"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            value={selectedBlur}
                            onChange={(newValue) => {
                                setSelectedBlur(newValue);
                            }}
                            label="blur"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            value={selectedCustomStyle}
                            onChange={(newValue) => {
                                setSelectedCustomStyle(newValue);
                            }}
                            label="enable custom style"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={errorMessage}
                        onChange={(val) => {
                            setErrorMessage(val);
                        }}
                        label="errorMessage"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'renderErrorMessage'}
                            value={selectedRenderErrorMessage}
                            onChange={(newValue) => {
                                setSelectedRenderErrorMessage(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable useValidatableForm'}
                            value={enableUseValidatableForm}
                            onChange={(newValue) => {
                                setEnableUseValidatableForm(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
            </Grid>
            <CurrentRulesInfo currentRules={currentJsx} dontStringify={true} header="Current Jsx" />
            <CurrentComponentApiInfo
                currentApiInfo={CheckboxApiInfo}
                currentApiLinks={'https://mui.com/material-ui/api/checkbox/#main-content'}
                header={'Checkbox'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentCheckbox;

const CheckboxApiInfo = [
    {
        name: 'id',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'path',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'label',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'value',
        type: 'bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'containerClassName',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'className',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'inputClassName',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'setPathIsBlurred',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'onChange',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'onBlur',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'setPathValue',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'errorMessage',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'noHelperText',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'indeterminate',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'disabled',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'hideErrorMessage',
        type: 'Bool',
        defaultValue: 'false',
        description: '',
    },
    {
        name: 'renderErrorMessage',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'labelProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'noLabel',
        type: 'Bool',
        defaultValue: 'false',
        description: '',
    },
];
