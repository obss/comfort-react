import { Autocomplete, Checkbox, TextField, useSnackbar, useValidatableForm } from '../../lib';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import { complexOptions, options } from '../../constants/Data';
import CurrentRulesInfo from '../CurrentRulesInfo';
import './ComponentAutocomplete.css';
import CurrentComponentApiInfo from '../CurrentComponentApiInfo';
import { customErrorMessageRenderer } from './CustomErrorMessageRenderer';
import { customErrorMessageJsx } from '../../constants/JsxConstants';

const StyledTextField = (props) => {
    return <TextField className="exampleAutocompleteStyle" {...props} />;
};

const LABEL_OPTIONS = ['label', 'id', 'description'];
const CUSTOM_INPUT = StyledTextField;
const PLACEHOLDER_TEXT = 'placeholder';

const rules = [
    { path: 'valSimpleSingle', ruleSet: [{ rule: 'required' }] },
    { path: 'valSimpleMultiple', ruleSet: [{ rule: 'required' }] },
    { path: 'valComplexSingle', ruleSet: [{ rule: 'required' }] },
    { path: 'valComplexMultiple', ruleSet: [{ rule: 'required' }] },
];

const ComponentAutocomplete = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [simpleSingleValue, setSimpleSingleValue] = useState(options[0]);
    const [simpleMultipleValue, setSimpleMultipleValue] = useState([options[0], options[3]]);
    const [complexSingleValue, setComplexSingleValue] = useState(complexOptions[1].id);
    const [complexMultipleValue, setComplexMultipleValue] = useState([complexOptions[2].id, complexOptions[4].id]);
    const [selectedLabelOptions, setSelectedLabelOptions] = useState(LABEL_OPTIONS[0]);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedDisableClearable, setSelectedDisableClearable] = useState(false);
    const [selectedFullWidth, setSelectedFullWidth] = useState(false);
    const [selectedBlur, setSelectedBlur] = useState(false);
    const [selectedCustomInput, setSelectedCustomInput] = useState(false);
    const [selectedSortAlphabetically, setSelectedSortAlphabetically] = useState(false);
    const [selectedOnCloseEvent, setSelectedOnCloseEvent] = useState(false);
    const [selectedLoading, setSelectedLoading] = useState(false);
    const [selectedPlaceholder, setSelectedPlaceholder] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [selectedRenderErrorMessage, setSelectedRenderErrorMessage] = useState(false);
    const [enableUseValidatableForm, setEnableUseValidatableForm] = useState(false);
    const { setPathValue, setPathIsBlurred, getValue, getError } = useValidatableForm({
        rules,
    });

    const handleSimpleSingleChange = (newValue) => {
        setSimpleSingleValue(newValue);
    };

    const handleSimpleMultipleChange = (newValue) => {
        setSimpleMultipleValue(newValue);
    };

    const handleComplexSingleChange = (newValue) => {
        setComplexSingleValue(newValue);
    };

    const handleComplexMultipleChange = (newValue) => {
        setComplexMultipleValue(newValue);
    };

    const handleBlur = () => {
        enqueueSnackbar('Autocomplete is blurred', { variant: 'info' });
    };

    const handleOnClose = () => {
        enqueueSnackbar('Autocomplete is closed', { variant: 'info' });
    };

    const autocompleteSimpleSingleElementJsx = (
        <Autocomplete
            label="Autocomplete simple single"
            path="valSimpleSingle"
            placeholder={selectedPlaceholder ? PLACEHOLDER_TEXT : null}
            value={!enableUseValidatableForm ? simpleSingleValue : getValue('valSimpleSingle')}
            onChange={!enableUseValidatableForm ? handleSimpleSingleChange : null}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
            errorMessage={enableUseValidatableForm ? getError('valSimpleSingle') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            options={options}
            disabled={selectedDisabled}
            disableClearable={selectedDisableClearable}
            fullWidth={selectedFullWidth}
            sortAlphabetically={selectedSortAlphabetically}
            onClose={selectedOnCloseEvent ? handleOnClose : null}
            loading={selectedLoading}
            RenderInputComponent={selectedCustomInput ? CUSTOM_INPUT : null}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
        />
    );

    const autocompleteSimpleMultipleElementJsx = (
        <Autocomplete
            label="Autocomplete simple multiple"
            path="valSimpleMultiple"
            placeholder={selectedPlaceholder ? PLACEHOLDER_TEXT : null}
            value={!enableUseValidatableForm ? simpleMultipleValue : getValue('valSimpleMultiple')}
            onChange={!enableUseValidatableForm ? handleSimpleMultipleChange : null}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
            errorMessage={enableUseValidatableForm ? getError('valSimpleMultiple') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            options={options}
            multiple={true}
            disabled={selectedDisabled}
            disableClearable={selectedDisableClearable}
            fullWidth={selectedFullWidth}
            sortAlphabetically={selectedSortAlphabetically}
            onClose={selectedOnCloseEvent ? handleOnClose : null}
            loading={selectedLoading}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
        />
    );

    const autocompleteComplexSingleElementJsx = (
        <Autocomplete
            label="Autocomplete complex single"
            path="valComplexSingle"
            placeholder={selectedPlaceholder ? PLACEHOLDER_TEXT : null}
            value={!enableUseValidatableForm ? complexSingleValue : getValue('valComplexSingle')}
            onChange={!enableUseValidatableForm ? handleComplexSingleChange : null}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
            errorMessage={enableUseValidatableForm ? getError('valComplexSingle') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            options={complexOptions}
            valueKey="id"
            disabled={selectedDisabled}
            disableClearable={selectedDisableClearable}
            getOptionLabel={(option) => {
                if (selectedLabelOptions === 'label') {
                    return option.label;
                } else if (selectedLabelOptions === 'id') {
                    return `${option.id}`;
                } else if (selectedLabelOptions === 'description') {
                    return option.description;
                } else {
                    return option.label;
                }
            }}
            fullWidth={selectedFullWidth}
            sortAlphabetically={selectedSortAlphabetically}
            onClose={selectedOnCloseEvent ? handleOnClose : null}
            loading={selectedLoading}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
        />
    );

    const autocompleteComplexMultipleElementJsx = (
        <Autocomplete
            label="Autocomplete complex multiple"
            path="valComplexMultiple"
            placeholder={selectedPlaceholder ? PLACEHOLDER_TEXT : null}
            value={!enableUseValidatableForm ? complexMultipleValue : getValue('valComplexMultiple')}
            onChange={!enableUseValidatableForm ? handleComplexMultipleChange : null}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
            errorMessage={enableUseValidatableForm ? getError('valComplexMultiple') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            options={complexOptions}
            valueKey="id"
            multiple={true}
            disabled={selectedDisabled}
            disableClearable={selectedDisableClearable}
            getOptionLabel={(option) => {
                if (selectedLabelOptions === 'label') {
                    return option.label;
                } else if (selectedLabelOptions === 'id') {
                    return `${option.id}`;
                } else if (selectedLabelOptions === 'description') {
                    return option.description;
                } else {
                    return option.label;
                }
            }}
            fullWidth={selectedFullWidth}
            sortAlphabetically={selectedSortAlphabetically}
            onClose={selectedOnCloseEvent ? handleOnClose : null}
            loading={selectedLoading}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
        />
    );

    const autocompleteElementJsx = (
        <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} sm={6}>
                {autocompleteSimpleSingleElementJsx}
            </Grid>
            <Grid item xs={12} sm={6}>
                {autocompleteSimpleMultipleElementJsx}
            </Grid>
            <Grid item xs={12} sm={6}>
                {autocompleteComplexSingleElementJsx}
            </Grid>
            <Grid item xs={12} sm={6}>
                {autocompleteComplexMultipleElementJsx}
            </Grid>
        </Grid>
    );

    let currentJsx = jsxToString(autocompleteSimpleSingleElementJsx, {
        displayName: 'Autocomplete',
        useFunctionCode: true,
        keyValueOverride: {
            renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
        },
    });
    currentJsx +=
        '\n\n' +
        jsxToString(autocompleteSimpleMultipleElementJsx, {
            displayName: 'Autocomplete',
            useFunctionCode: true,
            keyValueOverride: {
                renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
            },
        });
    currentJsx +=
        '\n\n' +
        jsxToString(autocompleteComplexSingleElementJsx, {
            displayName: 'Autocomplete',
            useFunctionCode: true,
            keyValueOverride: {
                renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
            },
        });
    currentJsx +=
        '\n\n' +
        jsxToString(autocompleteComplexMultipleElementJsx, {
            displayName: 'Autocomplete',
            useFunctionCode: true,
            keyValueOverride: {
                renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
            },
        });
    currentJsx = "import { Autocomplete } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper header="Autocomplete" codeUrl={'components/components/ComponentAutocomplete.js'}>
            {autocompleteElementJsx}
            <Grid container spacing={2} marginTop={2}>
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
                            label={'disableClearable'}
                            value={selectedDisableClearable}
                            onChange={(newValue) => {
                                setSelectedDisableClearable(newValue);
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
                            label={'enable custom input'}
                            value={selectedCustomInput}
                            onChange={(newValue) => {
                                setSelectedCustomInput(newValue);
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
                            label={'sort alphabetically'}
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
                            label={'onClose'}
                            value={selectedOnCloseEvent}
                            onChange={(newValue) => {
                                setSelectedOnCloseEvent(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'loading'}
                            value={selectedLoading}
                            onChange={(newValue) => {
                                setSelectedLoading(newValue);
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
                currentApiInfo={AutocompleteApiInfo}
                currentApiLinks={'https://mui.com/material-ui/api/autocomplete/#main-content'}
                header={'Autocomplete'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentAutocomplete;

const AutocompleteApiInfo = [
    {
        name: 'id',
        type: 'string',
        defaultValue: '',
        description: '',
    },
    {
        name: 'valueKey',
        type: 'oneOfType [String, Number]',
        defaultValue: '',
        description: '',
    },
    {
        name: 'getOptionLabel',
        type: 'Func',
        defaultValue: 'option.label',
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
        type: 'Any',
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
        name: 'options',
        type: 'Array',
        defaultValue: '[]',
        description: '',
    },
    {
        name: 'noHelperText',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'placeHolder',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'getSelectedObjectCallback',
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
        name: 'loading',
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
        name: 'onInputChange',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'onInputRemove',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'RenderInputComponent',
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
