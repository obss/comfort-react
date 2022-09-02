import { Autocomplete, Checkbox, TextField, CheckList } from '../../lib';
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

const CHECKBOX_SIZE = ['medium', 'large', 'small'];
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

const ComponentCheckList = () => {
    const [simpleValue, setSimpleValue] = useState([options[0]]);
    const [complexValue, setComplexValue] = useState([complexOptions[1].id]);
    const [selectedCheckBoxSize, setSelectedCheckBoxSize] = useState(CHECKBOX_SIZE[0]);
    const [selectedLabelOptions, setSelectedLabelOptions] = useState(LABEL_OPTIONS[0]);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedFullWidth, setSelectedFullWidth] = useState(false);
    const [selectedCustomTheme, setSelectedCustomTheme] = useState(false);
    const [selectedEnableClassName, setSelectedEnableClassName] = useState(false);
    const [selectedSortAlphabetically, setSelectedSortAlphabetically] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [selectedRenderErrorMessage, setSelectedRenderErrorMessage] = useState(false);
    const [enableUseValidatableForm, setEnableUseValidatableForm] = useState(false);
    const [selectedGetOptionDisabled, setSelectedGetOptionDisabled] = useState(false);

    const { setPathValue, setPathIsBlurred, getValue, getError } = useValidatableForm({
        rules,
    });

    const handleSimpleSingleChange = (newValue) => {
        setSimpleValue(newValue);
    };

    const handleComplexSingleChange = (newValue) => {
        setComplexValue(newValue);
    };

    const simpleGetOptionDisabled = (option) => option === 'Antarctica';
    const complexGetOptionDisabled = (option) => option.label === 'Antarctica';

    const checkListSimpleSingleElementJsx = (
        <CheckList
            className={selectedEnableClassName ? 'exampleStyle' : ''}
            label="CheckList simple"
            path="valSimple"
            value={!enableUseValidatableForm ? simpleValue : getValue('valSimple')}
            onChange={!enableUseValidatableForm ? handleSimpleSingleChange : null}
            errorMessage={enableUseValidatableForm ? getError('valSimple') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            options={options}
            disabled={selectedDisabled}
            fullWidth={selectedFullWidth}
            sortAlphabetically={selectedSortAlphabetically}
            checkboxProps={{
                sx: selectedCustomTheme ? CUSTOM_THEME : null,
                size: selectedCheckBoxSize ? selectedCheckBoxSize : 'medium',
            }}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
            getOptionDisabled={selectedGetOptionDisabled ? simpleGetOptionDisabled : null}
        />
    );

    const checkListComplexSingleElementJsx = (
        <CheckList
            className={selectedEnableClassName ? 'exampleStyle' : ''}
            label="CheckList complex"
            path="valComplex"
            value={!enableUseValidatableForm ? complexValue : getValue('valComplex')}
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
            checkboxProps={{
                sx: selectedCustomTheme ? CUSTOM_THEME : null,
                size: selectedCheckBoxSize ? selectedCheckBoxSize : 'medium',
            }}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
            getOptionDisabled={selectedGetOptionDisabled ? complexGetOptionDisabled : null}
        />
    );

    const checkListElementJsx = (
        <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} sm={6}>
                {checkListSimpleSingleElementJsx}
            </Grid>
            <Grid item xs={12} sm={6}>
                {checkListComplexSingleElementJsx}
            </Grid>
        </Grid>
    );

    let currentJsx = jsxToString(checkListSimpleSingleElementJsx, {
        displayName: 'CheckList',
        useFunctionCode: true,
        keyValueOverride: {
            renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
        },
    });
    currentJsx +=
        '\n\n' +
        jsxToString(checkListComplexSingleElementJsx, {
            displayName: 'CheckList',
            useFunctionCode: true,
            keyValueOverride: {
                renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
            },
        });
    currentJsx = "import { CheckList } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper header="CheckList" codeUrl={'components/components/ComponentCheckList.js'}>
            {checkListElementJsx}
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedCheckBoxSize}
                        options={CHECKBOX_SIZE}
                        onChange={(val) => {
                            setSelectedCheckBoxSize(val);
                        }}
                        label={'checkbox size'}
                    />
                </Grid>
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
                currentApiInfo={CheckListApiInfo}
                currentApiLinks={'https://mui.com/material-ui/api/radio/#main-content'}
                header={'CheckList'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentCheckList;

const CheckListApiInfo = [
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
        name: 'checkbox',
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
    {
        name: 'getOptionDisabled',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
];
