import { Autocomplete, Button, Checkbox, useSnackbar } from '../../lib';
import { CircularProgress, Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { SendOutlined } from '@mui/icons-material';
import './ComponentButton.css';
import CurrentComponentApiInfo from '../CurrentComponentApiInfo';

const VARIANT_OPTIONS = ['contained', 'outlined'];
const COLOR_OPTIONS = ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'];
const LOADING_POSITIONS = ['center', 'start', 'end'];
const BUTTON_SIZE = ['medium', 'large', 'small'];
const BUTTON_ICON_POSITIONS = ['end', 'start'];
const BUTTON_STYLE = { backgroundColor: 'red', color: 'black' };
const BUTTON_ICON = <SendOutlined />;
const CUSTOM_LOADING = <CircularProgress color={'warning'} size={12} />;

const ComponentButton = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [selectedVariant, setSelectedVariant] = useState(VARIANT_OPTIONS[0]);
    const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
    const [selectedLoadingPosition, setSelectedLoadingPosition] = useState(LOADING_POSITIONS[0]);
    const [selectedButtonSize, setSelectedButtonSize] = useState(BUTTON_SIZE[0]);
    const [selectedLoading, setSelectedLoading] = useState(false);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState(false);
    const [selectedButtonIcon, setSelectedButtonIcon] = useState(false);
    const [selectedButtonIconPosition, setSelectedButtonIconPosition] = useState(BUTTON_ICON_POSITIONS[0]);
    const [selectedCustomLoading, setSelectedCustomLoading] = useState(false);
    const [selectedClassName, setSelectedClassName] = useState(false);

    const handleClick = () => {
        enqueueSnackbar('Button is clicked', { variant: 'info' });
    };

    const buttonElementJsx = (
        <Button
            className={selectedClassName ? 'exampleStyle' : ''}
            style={selectedStyle ? BUTTON_STYLE : null}
            startIcon={
                selectedLoading && selectedLoadingPosition === 'start'
                    ? CUSTOM_LOADING
                    : selectedButtonIcon && selectedButtonIconPosition === 'start'
                    ? BUTTON_ICON
                    : null
            }
            endIcon={
                selectedLoading && selectedLoadingPosition === 'end'
                    ? CUSTOM_LOADING
                    : selectedButtonIcon && selectedButtonIconPosition === 'end'
                    ? BUTTON_ICON
                    : null
            }
            loadingIndicator={selectedCustomLoading ? CUSTOM_LOADING : null}
            loadingPosition={selectedLoadingPosition ? selectedLoadingPosition : 'center'}
            variant={selectedVariant}
            color={selectedColor ? selectedColor : undefined}
            loading={selectedLoading}
            disabled={selectedDisabled}
            size={selectedButtonSize ? selectedButtonSize : undefined}
            onClick={handleClick}
        >
            Button
        </Button>
    );

    let currentJsx = jsxToString(buttonElementJsx, {
        displayName: 'Button',
        useFunctionCode: true,
        keyValueOverride: {
            startIcon:
                selectedLoading && selectedLoadingPosition === 'start'
                    ? selectedCustomLoading
                        ? '<CircularProgress color={"warning"} size={12} />'
                        : '<CircularProgress />'
                    : selectedButtonIcon && selectedButtonIconPosition === 'start'
                    ? '<SendOutlined />'
                    : null,
            endIcon:
                selectedLoading && selectedLoadingPosition === 'end'
                    ? selectedCustomLoading
                        ? '<CircularProgress color={"warning"} size={12} />'
                        : '<CircularProgress />'
                    : selectedButtonIcon && selectedButtonIconPosition === 'end'
                    ? '<SendOutlined />'
                    : null,
            loadingIndicator: selectedCustomLoading ? '<CircularProgress color={"warning"} size={12} />' : null,
        },
    });
    currentJsx = "import { Button } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper header="Button" codeUrl={'components/components/ComponentButton.js'}>
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
                        value={selectedColor}
                        options={COLOR_OPTIONS}
                        onChange={(val) => {
                            setSelectedColor(val);
                        }}
                        label={'color'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedLoadingPosition}
                        options={LOADING_POSITIONS}
                        onChange={(val) => {
                            setSelectedLoadingPosition(val);
                        }}
                        label={'loading position'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedButtonSize}
                        options={BUTTON_SIZE}
                        onChange={(val) => {
                            setSelectedButtonSize(val);
                        }}
                        label={'button size'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedButtonIconPosition}
                        options={BUTTON_ICON_POSITIONS}
                        onChange={(val) => {
                            setSelectedButtonIconPosition(val);
                        }}
                        label={'button icon position'}
                    />
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
                            label={'enable custom style'}
                            value={selectedStyle}
                            onChange={(newValue) => {
                                setSelectedStyle(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable icon'}
                            value={selectedButtonIcon}
                            onChange={(newValue) => {
                                setSelectedButtonIcon(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable custom loading'}
                            value={selectedCustomLoading}
                            onChange={(newValue) => {
                                setSelectedCustomLoading(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable classname style'}
                            value={selectedClassName}
                            onChange={(newValue) => {
                                setSelectedClassName(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
            </Grid>
            <CurrentRulesInfo currentRules={currentJsx} dontStringify={true} header="Current Jsx" />
            <CurrentComponentApiInfo
                currentApiInfo={ButtonApiInfo}
                currentApiLinks={'https://mui.com/material-ui/api/loading-button/'}
                header={'Button'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentButton;

const ButtonApiInfo = [
    {
        name: 'children',
        type: 'Node',
        defaultValue: '',
        description: '',
    },
    {
        name: 'className',
        type: 'String',
        defaultValue: '',
        description: '',
    },
];
