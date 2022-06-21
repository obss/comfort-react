import { Autocomplete, Checkbox, Switch, TextField, useSnackbar } from '../../lib';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import CurrentRulesInfo from '../CurrentRulesInfo';
import CurrentComponentApiInfo from '../CurrentComponentApiInfo';
import { customErrorMessageRenderer } from './CustomErrorMessageRenderer';
import { customErrorMessageJsx } from '../../constants/JsxConstants';
import { useValidatableForm } from 'react-validatable-form';

const SWITCH_SIZE = ['medium', 'small'];
const LABEL_PLACEMENT = ['end', 'bottom', 'start', 'top'];
const COLORS = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];

const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }] }];

const ComponentSwitch = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [selectedLabelPlacement, setSelectedLabelPlacement] = useState(LABEL_PLACEMENT[0]);
    const [selectedSwitchSize, setSelectedSwitchSize] = useState(SWITCH_SIZE[0]);
    const [selectedColor, setSelectedColor] = useState(COLORS[1]);
    const [value, setValue] = useState(true);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedBlur, setSelectedBlur] = useState(false);
    const [selectedCustomStyle, setSelectedCustomStyle] = useState(false);
    const [selectedChangeableLabel, setSelectedChangeableLabel] = useState(false);
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
        enqueueSnackbar('Switch is blurred', { variant: 'info' });
    };

    const switchElementJsx = (
        <Switch
            label="Switch"
            trueLabel={selectedChangeableLabel ? 'True Switch' : undefined}
            falseLabel={selectedChangeableLabel ? 'False Switch' : undefined}
            path="val"
            color={selectedColor}
            value={!enableUseValidatableForm ? value : getValue('val')}
            onChange={!enableUseValidatableForm ? handleChange : null}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
            errorMessage={enableUseValidatableForm ? getError('val') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            disabled={selectedDisabled}
            labelProps={{
                labelPlacement: selectedLabelPlacement ? selectedLabelPlacement : 'end',
            }}
            size={selectedSwitchSize}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
        />
    );

    let currentJsx = jsxToString(switchElementJsx, {
        displayName: 'Switch',
        useFunctionCode: true,
        keyValueOverride: {
            renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
        },
    });
    currentJsx = "import { Switch } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper header="Switch" codeUrl={'components/components/ComponentSwitch.js'}>
            {switchElementJsx}
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
                        value={selectedSwitchSize}
                        options={SWITCH_SIZE}
                        onChange={(val) => {
                            setSelectedSwitchSize(val);
                        }}
                        label="checkbox size"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedColor}
                        options={COLORS}
                        onChange={(val) => {
                            setSelectedColor(val);
                        }}
                        label="color"
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
                            label={'changeable label'}
                            value={selectedChangeableLabel}
                            onChange={(newValue) => {
                                setSelectedChangeableLabel(newValue);
                            }}
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
                currentApiInfo={SwitchApiInfo}
                currentApiLinks={'https://mui.com/material-ui/api/switch/#main-content'}
                header={'Switch'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentSwitch;

const SwitchApiInfo = [
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
