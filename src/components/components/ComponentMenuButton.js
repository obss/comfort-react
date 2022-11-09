import { Autocomplete, Checkbox, MenuButton } from '../../lib';
import { Grid, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import CurrentRulesInfo from '../CurrentRulesInfo';
import { FilterList } from '@mui/icons-material';
import CurrentComponentApiInfo from '../CurrentComponentApiInfo';

const MENU_ITEMS = [
    {
        key: 1,
        value: 'Item 1',
        selected: false,
    },
    {
        key: 2,
        value: 'Item 2',
        selected: false,
    },
    {
        key: 3,
        value: 'Item 3',
        selected: false,
    },
];
const VERTICAL_ORIGINS = ['top', 'bottom', 'center'];
const HORIZONTAL_ORIGINS = ['right', 'left', 'center'];

const ComponentMenuButton = () => {
    const [menuItems, setMenuItems] = useState(MENU_ITEMS);
    const [selectedVerticalTransform, setSelectedVerticalTransform] = useState(VERTICAL_ORIGINS[0]);
    const [selectedHorizontalTransform, setSelectedHorizontalTransform] = useState(HORIZONTAL_ORIGINS[0]);
    const [selectedVerticalAnchor, setSelectedVerticalAnchor] = useState(VERTICAL_ORIGINS[0]);
    const [selectedHorizontalAnchor, setSelectedHorizontalAnchor] = useState(HORIZONTAL_ORIGINS[0]);
    const [selectedCustomTransition, setSelectedCustomTransition] = useState(false);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedIconButton, setSelectedIconButton] = useState(false);
    const [selectedLoading, setSelectedLoading] = useState(false);
    const [selectedClassname, setSelectedClassname] = useState(false);

    let menuProps = {};
    if (selectedCustomTransition) {
        menuProps.transitionDuration = {
            enter: 100,
            exit: 1000,
        };
    }

    const handleClickItem = (item) => {
        const copyItem = { ...item };
        copyItem.selected = !copyItem.selected;
        const index = menuItems.findIndex((element) => element.key === copyItem.key);
        const copyItems = [...menuItems];
        copyItems[index] = copyItem;
        setMenuItems(copyItems);
    };

    const menuItemsJSX = () => {
        return menuItems.map((element) => {
            return (
                <MenuItem key={element.key} onClick={() => handleClickItem(element)}>
                    <ListItemIcon>
                        <Checkbox noLabel value={element.selected} tabIndex={-1} disableRipple />
                    </ListItemIcon>
                    <ListItemText primary={element.value} />
                </MenuItem>
            );
        });
    };

    const menuButtonElementJsx = (
        <MenuButton
            className={selectedClassname ? 'exampleStyle' : ''}
            isIconButton={selectedIconButton}
            menuChildren={menuItemsJSX()}
            menuProps={{
                ...menuProps,
                transformOrigin: {
                    vertical: selectedVerticalTransform,
                    horizontal: selectedHorizontalTransform,
                },
                anchorOrigin: {
                    vertical: selectedVerticalAnchor,
                    horizontal: selectedHorizontalAnchor,
                },
            }}
            buttonProps={{
                disabled: selectedDisabled,
                loading: selectedLoading,
            }}
        >
            <FilterList />
        </MenuButton>
    );

    let currentJsx = jsxToString(menuButtonElementJsx, {
        displayName: 'MenuButton',
        useFunctionCode: true,
        keyValueOverride: {
            menuChildren:
                'menuItems.map((element) => {\n' +
                '            return (\n' +
                '                <MenuItem key={element.key} onClick={() => handleClickItem(element)}>\n' +
                '                    <ListItemIcon>\n' +
                '                        <Checkbox noLabel value={element.selected} tabIndex={-1} disableRipple />\n' +
                '                    </ListItemIcon>\n' +
                '                    <ListItemText primary={element.value} />\n' +
                '                </MenuItem>\n' +
                '            );\n' +
                '        })',
        },
    });
    currentJsx = "import { MenuButton } from 'comfort-react';\n\n" + currentJsx;
    currentJsx = currentJsx.replace('<[object Object] />', '<FilterList />');

    return (
        <ExampleUsageWrapper header="MenuButton" codeUrl={'components/components/ComponentMenuButton.js'}>
            {menuButtonElementJsx}
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedHorizontalTransform}
                        options={HORIZONTAL_ORIGINS}
                        onChange={(val) => {
                            setSelectedHorizontalTransform(val);
                        }}
                        label={'horizontal transform'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedVerticalTransform}
                        options={VERTICAL_ORIGINS}
                        onChange={(val) => {
                            setSelectedVerticalTransform(val);
                        }}
                        label={'vertical transform'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedHorizontalAnchor}
                        options={HORIZONTAL_ORIGINS}
                        onChange={(val) => {
                            setSelectedHorizontalAnchor(val);
                        }}
                        label={'horizontal anchor'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedVerticalAnchor}
                        options={VERTICAL_ORIGINS}
                        onChange={(val) => {
                            setSelectedVerticalAnchor(val);
                        }}
                        label={'vertical anchor'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'classname'}
                            value={selectedClassname}
                            onChange={(newValue) => {
                                setSelectedClassname(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'disable'}
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
                            label={'isIconButton'}
                            value={selectedIconButton}
                            onChange={(newValue) => {
                                setSelectedIconButton(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'custom transition'}
                            value={selectedCustomTransition}
                            onChange={(newValue) => {
                                setSelectedCustomTransition(newValue);
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
            </Grid>
            <CurrentRulesInfo currentRules={currentJsx} dontStringify={true} header="Current Jsx" />
            <CurrentComponentApiInfo
                currentApiInfo={MenuButtonApiInfo}
                currentApiLinks={'https://mui.com/material-ui/api/loading-button/'}
                header={'MenuButton'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentMenuButton;

const MenuButtonApiInfo = [
    {
        name: 'buttonProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
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
    {
        name: 'isIconButton',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'menuProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'menuChildren',
        type: 'Node',
        defaultValue: '',
        description: '',
    },
];
