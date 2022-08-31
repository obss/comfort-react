import { Autocomplete, Checkbox, TextField, TransferList } from '../../lib';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import { complexOptions, options } from '../../constants/Data';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { pink } from '@mui/material/colors';
import './ComponentTransferList.css';
import CurrentComponentApiInfo from '../CurrentComponentApiInfo';
import { customErrorMessageRenderer } from './CustomErrorMessageRenderer';
import { customErrorMessageJsx } from '../../constants/JsxConstants';
import { useValidatableForm } from 'react-validatable-form';

const LABEL_OPTIONS = ['label', 'id', 'description'];

const CHECKBOX_SIZE = ['medium', 'large', 'small'];
const CUSTOM_CHECKBOX_THEME = {
    color: pink[800],
    '&.Mui-checked': {
        color: pink[600],
    },
};

const CUSTOM_BUTTON_THEME = {
    borderRadius: 35,
    backgroundColor: '#21b6ae',
};

const rules = [
    { path: 'valSimple', ruleSet: [{ rule: 'required' }] },
    { path: 'valComplex', ruleSet: [{ rule: 'required' }] },
];

const ComponentTransferList = () => {
    const [simpleSingleValue, setSimpleSingleValue] = useState([options[0], options[3]]);
    const [complexSingleValue, setComplexSingleValue] = useState([complexOptions[2].id, complexOptions[4].id]);
    const [selectedLabelOptions, setSelectedLabelOptions] = useState(LABEL_OPTIONS[0]);
    const [selectedCheckboxSize, setSelectedCheckboxSize] = useState(CHECKBOX_SIZE[0]);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedFullWidth, setSelectedFullWidth] = useState(false);
    const [selectedEnableClassName, setSelectedEnableClassName] = useState(false);
    const [selectedSortAlphabetically, setSelectedSortAlphabetically] = useState(false);
    const [selectedCustomTheme, setSelectedCustomTheme] = useState(false);
    const [selectedCustomHeaderStyle, setSelectedCustomHeaderStyle] = useState(false);
    const [selectedCustomPaperStyle, setSelectedCustomPaperStyle] = useState(false);
    const [selectedCustomButtonStyle, setSelectedCustomButtonStyle] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [selectedRenderErrorMessage, setSelectedRenderErrorMessage] = useState(false);
    const [enableUseValidatableForm, setEnableUseValidatableForm] = useState(false);
    const [selectedGetOptionDisabled, setSelectedGetOptionDisabled] = useState(false);

    const { setPathValue, setPathIsBlurred, getValue, getError } = useValidatableForm({
        rules,
    });

    const handleSimpleSingleChange = (newValue) => {
        setSimpleSingleValue(newValue);
    };

    const handleComplexSingleChange = (newValue) => {
        setComplexSingleValue(newValue);
    };

    const checkboxProps = {
        sx: selectedCustomTheme ? CUSTOM_CHECKBOX_THEME : null,
    };

    if (selectedCheckboxSize) {
        checkboxProps.size = selectedCheckboxSize;
    }

    const simpleGetOptionDisabled = (option) => option === 'Antarctica';
    const complexGetOptionDisabled = (option) => option.label === 'Antarctica';

    const transferListSimpleSingleElementJsx = (
        <TransferList
            className={selectedEnableClassName ? 'exampleStyle' : ''}
            headerClassName={selectedCustomHeaderStyle ? 'exampleHeaderStyle' : ''}
            paperClassName={selectedCustomPaperStyle ? 'examplePaperStyle' : ''}
            leftHeader="simple"
            rightHeader="selected"
            path="valSimple"
            value={!enableUseValidatableForm ? simpleSingleValue : getValue('valSimple')}
            onChange={!enableUseValidatableForm ? handleSimpleSingleChange : null}
            errorMessage={enableUseValidatableForm ? getError('valSimple') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            options={options}
            disabled={selectedDisabled}
            fullWidth={selectedFullWidth}
            sortAlphabetically={selectedSortAlphabetically}
            checkboxProps={checkboxProps}
            buttonStyleProps={selectedCustomButtonStyle ? CUSTOM_BUTTON_THEME : null}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
            getOptionDisabled={selectedGetOptionDisabled ? simpleGetOptionDisabled : null}
        />
    );

    const transferListComplexSingleElementJsx = (
        <TransferList
            className={selectedEnableClassName ? 'exampleStyle' : ''}
            headerClassName={selectedCustomHeaderStyle ? 'exampleHeaderStyle' : ''}
            paperClassName={selectedCustomPaperStyle ? 'examplePaperStyle' : ''}
            leftHeader="complex"
            rightHeader="selected"
            path="valComplex"
            value={!enableUseValidatableForm ? complexSingleValue : getValue('valComplex')}
            onChange={!enableUseValidatableForm ? handleComplexSingleChange : null}
            errorMessage={enableUseValidatableForm ? getError('valComplex') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            options={complexOptions}
            valueKey="id"
            disabled={selectedDisabled}
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
            checkboxProps={checkboxProps}
            buttonStyleProps={selectedCustomButtonStyle ? CUSTOM_BUTTON_THEME : null}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
            getOptionDisabled={selectedGetOptionDisabled ? complexGetOptionDisabled : null}
        />
    );

    const transferListElementJsx = (
        <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} sm={6}>
                {transferListSimpleSingleElementJsx}
            </Grid>
            <Grid item xs={12} sm={6}>
                {transferListComplexSingleElementJsx}
            </Grid>
        </Grid>
    );

    let currentJsx = jsxToString(transferListSimpleSingleElementJsx, {
        displayName: 'TransferList',
        useFunctionCode: true,
        keyValueOverride: {
            renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
        },
    });
    currentJsx +=
        '\n\n' +
        jsxToString(transferListComplexSingleElementJsx, {
            displayName: 'TransferList',
            useFunctionCode: true,
            keyValueOverride: {
                renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
            },
        });
    currentJsx = "import { TransferList } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper header="TransferList" codeUrl={'components/components/ComponentTransferList.js'}>
            {transferListElementJsx}
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedLabelOptions}
                        options={LABEL_OPTIONS}
                        onChange={(val) => {
                            setSelectedLabelOptions(val);
                        }}
                        label={'getOptionLabel'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedCheckboxSize}
                        options={CHECKBOX_SIZE}
                        onChange={(val) => {
                            setSelectedCheckboxSize(val);
                        }}
                        label={'checkbox size'}
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
                            label={'custom header style'}
                            value={selectedCustomHeaderStyle}
                            onChange={(newValue) => {
                                setSelectedCustomHeaderStyle(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'custom paper style'}
                            value={selectedCustomPaperStyle}
                            onChange={(newValue) => {
                                setSelectedCustomPaperStyle(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'custom button style'}
                            value={selectedCustomButtonStyle}
                            onChange={(newValue) => {
                                setSelectedCustomButtonStyle(newValue);
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
                            label={'getOptionDisabled'}
                            value={selectedGetOptionDisabled}
                            onChange={(newValue) => {
                                setSelectedGetOptionDisabled(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
            </Grid>
            <CurrentRulesInfo currentRules={currentJsx} dontStringify={true} header="Current Jsx" />
            <CurrentComponentApiInfo
                currentApiInfo={TransferListApiInfo}
                currentApiLinks={''}
                header={'TransferList'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentTransferList;

const TransferListApiInfo = [
    {
        name: 'id',
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
        name: 'headerClassName',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'paperClassName',
        type: 'String',
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
        name: 'leftHeader',
        type: 'String',
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
        name: 'options',
        type: 'Array',
        defaultValue: '[]',
        description: '',
    },
    {
        name: 'path',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'rightHeader',
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
        name: 'errorMessage',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'value',
        type: 'Array',
        defaultValue: '',
        description: '',
    },
    {
        name: 'valueKey',
        type: 'oneOfType (String, Number)',
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
        name: 'sortAlphabetically',
        type: 'Bool',
        defaultValue: 'false',
        description: '',
    },
    {
        name: 'disabled',
        type: 'Bool',
        defaultValue: 'false',
        description: '',
    },
    {
        name: 'checkboxProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'buttonStyleProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'getOptionDisabled',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
];
