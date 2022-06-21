import { Autocomplete, IconButton, Checkbox, useSnackbar } from '../../lib';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { SendOutlined } from '@mui/icons-material';
import './ComponentIconButton.css';
import CurrentComponentApiInfo from '../CurrentComponentApiInfo';

const COLOR_OPTIONS = ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'];
const BUTTON_SIZE = ['medium', 'large', 'small'];
const BUTTON_STYLE = { backgroundColor: 'red', color: 'black' };
const CUSTOM_LOADING_PROPS = { color: 'warning', size: 12 };

const ComponentIconButton = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
    const [selectedButtonSize, setSelectedButtonSize] = useState(BUTTON_SIZE[0]);
    const [selectedLoading, setSelectedLoading] = useState(false);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState(false);
    const [selectedCustomLoading, setSelectedCustomLoading] = useState(false);
    const [selectedClassName, setSelectedClassName] = useState(false);

    const handleClick = () => {
        enqueueSnackbar('IconButton is clicked', { variant: 'info' });
    };

    const iconButtonElementJsx = (
        <IconButton
            className={selectedClassName ? 'exampleIconButtonStyle' : ''}
            style={selectedStyle ? BUTTON_STYLE : null}
            circularProgressProps={selectedCustomLoading ? CUSTOM_LOADING_PROPS : null}
            color={selectedColor ? selectedColor : undefined}
            loading={selectedLoading}
            disabled={selectedDisabled}
            size={selectedButtonSize ? selectedButtonSize : undefined}
            onClick={handleClick}
        >
            <SendOutlined />
        </IconButton>
    );

    let currentJsx = jsxToString(iconButtonElementJsx, { displayName: 'IconButton', useFunctionCode: true });
    currentJsx = "import { IconButton } from 'comfort-react';\n\n" + currentJsx;
    currentJsx = currentJsx.replace('<[object Object] />', '<SendOutlined />');

    return (
        <ExampleUsageWrapper header="IconButton" codeUrl={'components/components/ComponentIconButton.js'}>
            {iconButtonElementJsx}
            <Grid container spacing={2} marginTop={2}>
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
                        value={selectedButtonSize}
                        options={BUTTON_SIZE}
                        onChange={(val) => {
                            setSelectedButtonSize(val);
                        }}
                        label={'button size'}
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
                currentApiInfo={IconButtonApiInfo}
                currentApiLinks={'https://mui.com/material-ui/api/icon-button/'}
                header={'IconButton'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentIconButton;

const IconButtonApiInfo = [
    {
        name: 'children',
        type: 'Node',
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
        name: 'loading',
        type: 'Bool',
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
        name: 'circularProgressProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
];
