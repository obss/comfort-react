import { Autocomplete, Checkbox, RadioButton, TextField } from '../../lib';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import { complexOptions, options } from '../../constants/Data';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { pink } from '@mui/material/colors';
import './ComponentRadioButton.css';
import CurrentComponentApiInfo from '../CurrentComponentApiInfo';
import { customErrorMessageRenderer } from './CustomErrorMessageRenderer';
import { customErrorMessageJsx } from '../../constants/JsxConstants';
import { useValidatableForm } from 'react-validatable-form';

const RADIO_SIZE = ['medium', 'large', 'small'];
const LABEL_PLACEMENT = ['end', 'bottom', 'start', 'top'];
const LABEL_OPTIONS = ['label', 'id', 'description'];
const CUSTOM_THEME = {
    color: pink[800],
    '&.Mui-checked': {
        color: pink[600],
    },
};

const rules = [
    { path: 'valSimple', ruleSet: [{ rule: 'required' }] },
    { path: 'valComplex', ruleSet: [{ rule: 'required' }] },
];

const ComponentRadioButton = () => {
    const [simpleSingleValue, setSimpleSingleValue] = useState(options[0]);
    const [complexSingleValue, setComplexSingleValue] = useState(complexOptions[1].id);
    const [selectedRadioSize, setSelectedRadioSize] = useState(RADIO_SIZE[0]);
    const [selectedLabelPlacement, setSelectedLabelPlacement] = useState(LABEL_PLACEMENT[0]);
    const [selectedLabelOptions, setSelectedLabelOptions] = useState(LABEL_OPTIONS[0]);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedRow, setSelectedRow] = useState(false);
    const [selectedFullWidth, setSelectedFullWidth] = useState(false);
    const [selectedCustomTheme, setSelectedCustomTheme] = useState(false);
    const [selectedEnableClassName, setSelectedEnableClassName] = useState(false);
    const [selectedSortAlphabetically, setSelectedSortAlphabetically] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [selectedRenderErrorMessage, setSelectedRenderErrorMessage] = useState(false);
    const [enableUseValidatableForm, setEnableUseValidatableForm] = useState(false);
    const { setPathValue, setPathIsBlurred, getValue, getError } = useValidatableForm({
        rules,
    });

    const handleSimpleSingleChange = (newValue) => {
        setSimpleSingleValue(newValue);
    };

    const handleComplexSingleChange = (newValue) => {
        setComplexSingleValue(newValue);
    };

    const radioButtonSimpleSingleElementJsx = (
        <RadioButton
            className={selectedEnableClassName ? 'exampleStyle' : ''}
            label="RadioButton simple"
            path="valSimple"
            value={!enableUseValidatableForm ? simpleSingleValue : getValue('valSimple')}
            onChange={!enableUseValidatableForm ? handleSimpleSingleChange : null}
            errorMessage={enableUseValidatableForm ? getError('valSimple') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            options={options}
            disabled={selectedDisabled}
            row={selectedRow}
            fullWidth={selectedFullWidth}
            sortAlphabetically={selectedSortAlphabetically}
            labelProps={{
                labelPlacement: selectedLabelPlacement ? selectedLabelPlacement : 'end',
            }}
            radioProps={{
                sx: selectedCustomTheme ? CUSTOM_THEME : null,
                size: selectedRadioSize ? selectedRadioSize : 'medium',
            }}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
        />
    );

    const radioButtonComplexSingleElementJsx = (
        <RadioButton
            className={selectedEnableClassName ? 'exampleStyle' : ''}
            label="RadioButton complex"
            path="valComplex"
            value={!enableUseValidatableForm ? complexSingleValue : getValue('valComplex')}
            onChange={!enableUseValidatableForm ? handleComplexSingleChange : null}
            errorMessage={enableUseValidatableForm ? getError('valComplex') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            options={complexOptions}
            valueKey="id"
            disabled={selectedDisabled}
            row={selectedRow}
            fullWidth={selectedFullWidth}
            sortAlphabetically={selectedSortAlphabetically}
            getOptionLabel={(option) => {
                if (selectedLabelOptions === 'label') {
                    return option.label;
                } else if (selectedLabelOptions === 'id') {
                    return option.id;
                } else if (selectedLabelOptions === 'description') {
                    return option.description;
                } else {
                    return option.label;
                }
            }}
            labelProps={{
                labelPlacement: selectedLabelPlacement ? selectedLabelPlacement : 'end',
            }}
            radioProps={{
                sx: selectedCustomTheme ? CUSTOM_THEME : null,
                size: selectedRadioSize ? selectedRadioSize : 'medium',
            }}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
        />
    );

    const radioButtonElementJsx = (
        <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} sm={6}>
                {radioButtonSimpleSingleElementJsx}
            </Grid>
            <Grid item xs={12} sm={6}>
                {radioButtonComplexSingleElementJsx}
            </Grid>
        </Grid>
    );

    let currentJsx = jsxToString(radioButtonSimpleSingleElementJsx, {
        displayName: 'RadioButton',
        useFunctionCode: true,
        keyValueOverride: {
            renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
        },
    });
    currentJsx +=
        '\n\n' +
        jsxToString(radioButtonComplexSingleElementJsx, {
            displayName: 'RadioButton',
            useFunctionCode: true,
            keyValueOverride: {
                renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
            },
        });
    currentJsx = "import { RadioButton } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper header="RadioButton" codeUrl={'components/components/ComponentRadioButton.js'}>
            {radioButtonElementJsx}
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedLabelPlacement}
                        options={LABEL_PLACEMENT}
                        onChange={(val) => {
                            setSelectedLabelPlacement(val);
                        }}
                        label={'label placement'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedRadioSize}
                        options={RADIO_SIZE}
                        onChange={(val) => {
                            setSelectedRadioSize(val);
                        }}
                        label={'radio size'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedLabelOptions}
                        options={LABEL_OPTIONS}
                        onChange={(val) => {
                            setSelectedLabelOptions(val);
                        }}
                        label={'label option'}
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
                            label={'row'}
                            value={selectedRow}
                            onChange={(newValue) => {
                                setSelectedRow(newValue);
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
                            label={'custom theme'}
                            value={selectedCustomTheme}
                            onChange={(newValue) => {
                                setSelectedCustomTheme(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable classname style'}
                            value={selectedEnableClassName}
                            onChange={(newValue) => {
                                setSelectedEnableClassName(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'sortAlphabetically'}
                            value={selectedSortAlphabetically}
                            onChange={(newValue) => {
                                setSelectedSortAlphabetically(newValue);
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
                currentApiInfo={RadioButtonApiInfo}
                currentApiLinks={'https://mui.com/material-ui/api/radio/#main-content'}
                header={'RadioButton'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentRadioButton;

const RadioButtonApiInfo = [
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
        name: 'valueKey',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'options',
        type: 'Array',
        defaultValue: '[]',
        description: '',
    },
    {
        name: 'errorMessage',
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
        name: 'sortAlphabetically',
        type: 'Bool',
        defaultValue: 'false',
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
        name: 'getOptionLabel',
        type: 'Func',
        defaultValue: '(option) => option.label',
        description: '',
    },
    {
        name: 'row',
        type: 'Bool',
        defaultValue: 'false',
        description: '',
    },
    {
        name: 'noHelperText',
        type: 'bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'fullWidth',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'containerClass',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'labelClassName',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'disabled',
        type: 'Bool',
        defaultValue: 'false',
        description: '',
    },
    {
        name: 'radioProps',
        type: 'Object',
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
        name: 'renderErrorMessage',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
];
