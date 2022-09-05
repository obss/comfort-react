import { Autocomplete, Checkbox, TextField, useSnackbar, useValidatableForm } from '../../lib';
import { useState } from 'react';
import { complexOptions, options } from '../../constants/Data';
import { customErrorMessageRenderer } from './CustomErrorMessageRenderer';
import { Grid } from '@mui/material';
import jsxToString from 'jsx-to-string';
import { customErrorMessageJsx } from '../../constants/JsxConstants';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import FormGroup from '@mui/material/FormGroup';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { pink } from '@mui/material/colors';
import './ComponentTransferList.css';
import ShrinkableTransferList from '../../lib/components/ShrinkableTransferList';

const LABEL_OPTIONS = ['label', 'id', 'description'];
const PLACEHOLDER_TEXT = 'placeholder';
const CHECKBOX_SIZE = ['medium', 'large', 'small'];
const MOBILE_WIDTH = ['1024', '600', '420'];
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

const ComponentShrinkableTransferList = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [simpleMultipleValue, setSimpleMultipleValue] = useState([options[0], options[3]]);
    const [complexMultipleValue, setComplexMultipleValue] = useState([complexOptions[2].id, complexOptions[4].id]);
    const [selectedLabelOptions, setSelectedLabelOptions] = useState(LABEL_OPTIONS[0]);
    const [selectedMobileWidth, setSelectedMobileWidth] = useState(MOBILE_WIDTH[0]);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedDisableClearable, setSelectedDisableClearable] = useState(false);
    const [selectedFullWidth, setSelectedFullWidth] = useState(false);
    const [selectedBlur, setSelectedBlur] = useState(false);
    const [selectedSortAlphabetically, setSelectedSortAlphabetically] = useState(false);
    const [selectedOnCloseEvent, setSelectedOnCloseEvent] = useState(false);
    const [selectedLoading, setSelectedLoading] = useState(false);
    const [selectedPlaceholder, setSelectedPlaceholder] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [selectedRenderErrorMessage, setSelectedRenderErrorMessage] = useState(false);
    const [selectedCheckboxSize, setSelectedCheckboxSize] = useState(CHECKBOX_SIZE[0]);
    const [selectedEnableClassName, setSelectedEnableClassName] = useState(false);
    const [selectedCustomTheme, setSelectedCustomTheme] = useState(false);
    const [selectedCustomHeaderStyle, setSelectedCustomHeaderStyle] = useState(false);
    const [selectedCustomPaperStyle, setSelectedCustomPaperStyle] = useState(false);
    const [selectedCustomButtonStyle, setSelectedCustomButtonStyle] = useState(false);
    const [enableUseValidatableForm, setEnableUseValidatableForm] = useState(false);
    const [selectedGetOptionDisabled, setSelectedGetOptionDisabled] = useState(false);

    const { setPathValue, setPathIsBlurred, getValue, getError } = useValidatableForm({
        rules,
    });

    const handleSimpleMultipleChange = (newValue) => {
        setSimpleMultipleValue(newValue);
    };

    const handleComplexMultipleChange = (newValue) => {
        setComplexMultipleValue(newValue);
    };

    const handleBlur = () => {
        enqueueSnackbar('TextField is blurred', { variant: 'info' });
    };

    const handleOnClose = () => {
        enqueueSnackbar('TextField is closed', { variant: 'info' });
    };

    const checkboxProps = {
        sx: selectedCustomTheme ? CUSTOM_CHECKBOX_THEME : null,
    };

    if (selectedCheckboxSize) {
        checkboxProps.size = selectedCheckboxSize;
    }

    const simpleGetOptionDisabled = (option) => option === 'Antarctica';
    const complexGetOptionDisabled = (option) => option.label === 'Antarctica';

    const shrinkableTransferListSimpleElementJsx = (
        <ShrinkableTransferList
            label="ShrinkableTransferList simple multiple"
            leftHeader="simple"
            rightHeader="selected"
            placeholder={selectedPlaceholder ? PLACEHOLDER_TEXT : null}
            className={selectedEnableClassName ? 'exampleStyle' : ''}
            headerClassName={selectedCustomHeaderStyle ? 'exampleHeaderStyle' : ''}
            paperClassName={selectedCustomPaperStyle ? 'examplePaperStyle' : ''}
            id="valSimple"
            path="valSimple"
            value={!enableUseValidatableForm ? simpleMultipleValue : getValue('valSimple')}
            onChange={!enableUseValidatableForm ? handleSimpleMultipleChange : null}
            errorMessage={enableUseValidatableForm ? getError('valSimple') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
            options={options}
            multiple={true}
            disabled={selectedDisabled}
            disableClearable={selectedDisableClearable}
            fullWidth={selectedFullWidth}
            sortAlphabetically={selectedSortAlphabetically}
            onClose={selectedOnCloseEvent ? handleOnClose : null}
            loading={selectedLoading}
            checkboxProps={checkboxProps}
            buttonStyleProps={selectedCustomButtonStyle ? CUSTOM_BUTTON_THEME : null}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
            mobileWidth={selectedMobileWidth}
            getOptionDisabled={selectedGetOptionDisabled ? simpleGetOptionDisabled : null}
        />
    );

    const shrinkableTransferListComplexElementJsx = (
        <ShrinkableTransferList
            label="ShrinkableTransferList complex multiple"
            leftHeader="complex"
            rightHeader="selected"
            placeholder={selectedPlaceholder ? PLACEHOLDER_TEXT : null}
            className={selectedEnableClassName ? 'exampleStyle' : ''}
            headerClassName={selectedCustomHeaderStyle ? 'exampleHeaderStyle' : ''}
            paperClassName={selectedCustomPaperStyle ? 'examplePaperStyle' : ''}
            path="valComplex"
            value={!enableUseValidatableForm ? complexMultipleValue : getValue('valComplex')}
            onChange={!enableUseValidatableForm ? handleComplexMultipleChange : null}
            errorMessage={enableUseValidatableForm ? getError('valComplex') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
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
            checkboxProps={checkboxProps}
            buttonStyleProps={selectedCustomButtonStyle ? CUSTOM_BUTTON_THEME : null}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
            mobileWidth={selectedMobileWidth}
            getOptionDisabled={selectedGetOptionDisabled ? complexGetOptionDisabled : null}
        />
    );

    const shrinkElementJsx = (
        <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} sm={6}>
                {shrinkableTransferListSimpleElementJsx}
            </Grid>
            <Grid item xs={12} sm={6}>
                {shrinkableTransferListComplexElementJsx}
            </Grid>
        </Grid>
    );

    let currentJsx = jsxToString(shrinkableTransferListSimpleElementJsx, {
        displayName: 'ShrinkableTransferList',
        useFunctionCode: true,
        keyValueOverride: {
            renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
        },
    });
    currentJsx += jsxToString(shrinkableTransferListComplexElementJsx, {
        displayName: 'ShrinkableTransferList',
        useFunctionCode: true,
        keyValueOverride: {
            renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
        },
    });

    currentJsx = "import { ShrinkableTransferList } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper
            header="ShrinkableTransferList"
            codeUrl="components/components/ComponentShrinkableTransferList.js"
        >
            {shrinkElementJsx}
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
                    <Autocomplete
                        value={selectedMobileWidth}
                        options={MOBILE_WIDTH}
                        onChange={(val) => {
                            setSelectedMobileWidth(val);
                        }}
                        label={'mobile width'}
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
                            label={'onclose'}
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
        </ExampleUsageWrapper>
    );
};

export default ComponentShrinkableTransferList;
