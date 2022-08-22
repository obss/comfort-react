import { Autocomplete, Checkbox, TextField, useSnackbar } from '../../lib';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import CurrentRulesInfo from '../CurrentRulesInfo';
import './ComponentTextField.css';
import CurrentComponentApiInfo from '../CurrentComponentApiInfo';
import { customErrorMessageRenderer } from './CustomErrorMessageRenderer';
import { customErrorMessageJsx } from '../../constants/JsxConstants';
import { useValidatableForm } from 'react-validatable-form';

const VARIANT_OPTIONS = ['outlined', 'filled', 'standard'];
const TYPE_OPTIONS = ['text', 'password', 'number'];
const INPUT_STYLE = { color: 'red' };
const PLACEHOLDER_TEXT = 'placeholder';

const MAX_LENGTH_3000 = { maxLength: 3000 };

const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }] }];

const ComponentTextField = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = useState('controlled value');
    const [selectedVariant, setSelectedVariant] = useState(VARIANT_OPTIONS[0]);
    const [selectedType, setSelectedType] = useState(TYPE_OPTIONS[0]);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedMultiline, setSelectedMultiline] = useState(false);
    const [selectedRows, setSelectedRows] = useState();
    const [selectedMaxLength, setSelectedMaxLength] = useState(false);
    const [selectedFullWidth, setSelectedFullWidth] = useState(false);
    const [selectedLimitClass, setSelectedLimitClass] = useState(false);
    const [selectedHidePassword, setSelectedHidePassword] = useState(false);
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
        enqueueSnackbar('TextField is blurred', { variant: 'info' });
    };

    let restProps = {};
    if (selectedInputStyle) {
        restProps.InputProps = {
            style: INPUT_STYLE,
        };
    }

    const buttonElementJsx = (
        <TextField
            label="TextField"
            path="val"
            placeholder={selectedPlaceholder ? PLACEHOLDER_TEXT : null}
            value={!enableUseValidatableForm ? value : getValue('val')}
            onChange={!enableUseValidatableForm ? handleChange : null}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
            errorMessage={enableUseValidatableForm ? getError('val') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            limitClassName={selectedLimitClass ? 'exampleLimitStyle' : null}
            hidePasswordVisibility={selectedHidePassword}
            variant={selectedVariant}
            type={selectedType}
            multiline={selectedMultiline}
            rows={selectedRows > 5 ? 5 : selectedRows}
            disabled={selectedDisabled}
            inputProps={selectedMaxLength ? MAX_LENGTH_3000 : undefined}
            fullWidth={selectedFullWidth}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
            focusedLabel={selectedFocusedLabel ? 'Focused TextField' : null}
            {...restProps}
        />
    );

    let currentJsx = jsxToString(buttonElementJsx, {
        displayName: 'TextField',
        useFunctionCode: true,
        keyValueOverride: {
            renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
        },
    });
    currentJsx = "import { TextField } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper header="TextField" codeUrl={'components/components/ComponentTextField.js'}>
            {buttonElementJsx}
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
                        value={selectedType}
                        options={TYPE_OPTIONS}
                        onChange={(val) => {
                            setSelectedType(val);
                        }}
                        label={'type'}
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
                            label={'multiline'}
                            value={selectedMultiline}
                            onChange={(newValue) => {
                                setSelectedMultiline(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="number"
                        value={selectedRows}
                        onChange={(val) => {
                            setSelectedRows(val);
                        }}
                        label="rows"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'inputProps.maxLength'}
                            value={selectedMaxLength}
                            onChange={(newValue) => {
                                setSelectedMaxLength(newValue);
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
                            label={'enable limit class'}
                            value={selectedLimitClass}
                            onChange={(newValue) => {
                                setSelectedLimitClass(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'hide password icon'}
                            value={selectedHidePassword}
                            onChange={(newValue) => {
                                setSelectedHidePassword(newValue);
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
                currentApiInfo={TextFieldApiInfo}
                currentApiLinks={'https://mui.com/material-ui/api/text-field/#main-content'}
                header={'TextField'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentTextField;

const TextFieldApiInfo = [
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
        name: 'type',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'maxLength',
        type: 'Number',
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
        name: 'renderErrorMessage',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'limitClassNamew',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'hideCounter',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'hidePasswordVisibility',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
];
