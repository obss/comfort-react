import { Autocomplete, Checkbox, TextField, TimePicker, useSnackbar } from '../../lib';
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

const VARIANT_OPTIONS = ['outlined', 'filled', 'standard'];
const INPUT_STYLE = { color: 'red' };
const PLACEHOLDER_TEXT = 'placeholder';

const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }] }];

const ComponentTimePicker = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = useState('09:45');
    const [selectedVariant, setSelectedVariant] = useState(VARIANT_OPTIONS[0]);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedFullWidth, setSelectedFullWidth] = useState(false);
    const [selectedBlur, setSelectedBlur] = useState(false);
    const [selectedInputStyle, setSelectedInputStyle] = useState(false);
    const [selectedPlaceholder, setSelectedPlaceholder] = useState(false);
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
        enqueueSnackbar('TimePicker is blurred', { variant: 'info' });
    };

    const timePickerElementJsx = (
        <TimePicker
            label="TimePicker"
            path="val"
            placeholder={selectedPlaceholder ? PLACEHOLDER_TEXT : null}
            value={!enableUseValidatableForm ? value : getValue('val')}
            onChange={!enableUseValidatableForm ? handleChange : null}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
            error={enableUseValidatableForm ? !!getError('val') : null}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            variant={selectedVariant}
            disabled={selectedDisabled}
            fullWidth={selectedFullWidth}
            InputProps={{
                style: selectedInputStyle ? INPUT_STYLE : null,
            }}
            errorMessage={errorMessage}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
        />
    );

    let currentJsx = jsxToString(timePickerElementJsx, {
        displayName: 'TimePicker',
        useFunctionCode: true,
        keyValueOverride: {
            renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
        },
    });
    currentJsx = "import { TimePicker } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper header="TimePicker" codeUrl={'components/components/ComponentTimePicker.js'}>
            {timePickerElementJsx}
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedVariant}
                        options={VARIANT_OPTIONS}
                        onChange={(val) => {
                            setSelectedVariant(val);
                        }}
                        label={'variant'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'disabled'}
                            value={selectedDisabled}
                            onChange={(newValue) => {
                                setSelectedDisabled(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'fullWidth'}
                            value={selectedFullWidth}
                            onChange={(newValue) => {
                                setSelectedFullWidth(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable input style'}
                            value={selectedInputStyle}
                            onChange={(newValue) => {
                                setSelectedInputStyle(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'blur'}
                            value={selectedBlur}
                            onChange={(newValue) => {
                                setSelectedBlur(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'placeholder'}
                            value={selectedPlaceholder}
                            onChange={(newValue) => {
                                setSelectedPlaceholder(newValue);
                            }}
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
                currentApiInfo={TimePickerApiInfo}
                currentApiLinks={'https://imask.js.org/guide.html'}
                header={'TimePicker'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentTimePicker;

const TimePickerApiInfo = [
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
        name: 'value',
        type: 'oneOfType [Object, String]',
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
        name: 'setPathValue',
        type: 'Func',
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
        name: 'isSecond',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
];
