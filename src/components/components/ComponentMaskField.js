import { Autocomplete, Checkbox, MaskField, TextField, useSnackbar } from '../../lib';
import { IMask } from 'react-imask';
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
const MASK_TYPE = ['date', 'credit card', 'cost (regex)', 'custom mask'];
const INPUT_STYLE = { color: 'red' };
const PLACEHOLDER_TEXT = 'placeholder';

const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }] }];

const ComponentMaskField = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = useState('1999-02-04');
    const [selectedVariant, setSelectedVariant] = useState(VARIANT_OPTIONS[0]);
    const [selectedMaskType, setSelectedMaskType] = useState(MASK_TYPE[0]);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedFullWidth, setSelectedFullWidth] = useState(false);
    const [selectedBlur, setSelectedBlur] = useState(false);
    const [selectedInputStyle, setSelectedInputStyle] = useState(false);
    const [selectedPlaceholder, setSelectedPlaceholder] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [selectedRenderErrorMessage, setSelectedRenderErrorMessage] = useState(false);
    const [enableUseValidatableForm, setEnableUseValidatableForm] = useState(false);
    const [selectedFocusedLabel, setSelectedFocusedLabel] = useState(false);
    const { setPathValue, setPathIsBlurred, getValue, getError } = useValidatableForm({
        rules,
    });

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleBlur = () => {
        enqueueSnackbar('MaskField is blurred', { variant: 'info' });
    };

    const maskFieldElementJsx = (
        <MaskField
            label="MaskField"
            path="val"
            placeholder={selectedPlaceholder ? PLACEHOLDER_TEXT : null}
            value={!enableUseValidatableForm ? value : getValue('val')}
            onChange={!enableUseValidatableForm ? handleChange : null}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
            errorMessage={enableUseValidatableForm ? getError('val') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            variant={selectedVariant}
            disabled={selectedDisabled}
            fullWidth={selectedFullWidth}
            InputProps={{
                style: selectedInputStyle ? INPUT_STYLE : null,
            }}
            maskFormat={
                selectedMaskType === 'date'
                    ? 'YYYY-MM-DD'
                    : selectedMaskType === 'credit card'
                    ? '0000 0000 0000 0000'
                    : selectedMaskType === 'cost (regex)'
                    ? /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/
                    : selectedMaskType === 'custom mask'
                    ? '000 000.0000-0000'
                    : null
            }
            blocks={{
                YYYY: {
                    mask: IMask.MaskedRange,
                    from: 1900,
                    to: 2199,
                },
                MM: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 12,
                },
                DD: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 31,
                },
            }}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
            focusedLabel={selectedFocusedLabel ? 'Focused MaskField' : null}
        />
    );

    let currentJsx = jsxToString(maskFieldElementJsx, {
        displayName: 'MaskField',
        useFunctionCode: true,
        keyValueOverride: {
            renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
        },
    });
    currentJsx = "import { MaskField } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper header="MaskField" codeUrl={'components/components/ComponentMaskField.js'}>
            {maskFieldElementJsx}
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
                    <Autocomplete
                        value={selectedMaskType}
                        options={MASK_TYPE}
                        onChange={(val) => {
                            setSelectedMaskType(val);
                        }}
                        label={'mask type'}
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
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable focusedLabel'}
                            value={selectedFocusedLabel}
                            onChange={(newValue) => {
                                setSelectedFocusedLabel(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
            </Grid>
            <CurrentRulesInfo currentRules={currentJsx} dontStringify={true} header="Current Jsx" />
            <CurrentComponentApiInfo
                currentApiInfo={MaskFieldApiInfo}
                currentApiLinks={'https://imask.js.org/guide.html'}
                header={'MaskField'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentMaskField;

const MaskFieldApiInfo = [
    {
        name: 'id',
        type: 'string',
        defaultValue: '',
        description: '',
    },
    {
        name: 'path',
        type: 'string',
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
        name: 'focusedLabel',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'value',
        type: 'oneOfType [String, Number]',
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
        name: 'errorMessage',
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
        name: 'onKeyUp',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'onEnterPressed',
        type: 'Func',
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
        name: 'multiline',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'variant',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'type',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'maskFormat',
        type: 'String (Required)',
        defaultValue: '',
        description: '',
    },
    {
        name: 'definitions',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'Blocks',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'renderErrorMessage',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'InputComponenet',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'InputProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
];
