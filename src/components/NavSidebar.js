import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import { ExpandMore, Search } from '@mui/icons-material';

const allMenuItems = [
    {
        title: 'Getting Started',
        itemId: 'getting-started-group',
        subNav: [
            {
                title: 'Home',
                itemId: '/getting-started/home',
                keywords: ['home', 'npm', 'yarn'],
            },
            {
                title: 'Installation',
                itemId: '/getting-started/installation',
                keywords: ['npm', 'yarn'],
            },
            {
                title: 'Usage',
                itemId: '/getting-started/usage',
                keywords: ['provider', 'usage'],
            },
        ],
    },
    {
        title: 'Components',
        itemId: 'components-group',
        subNav: [
            {
                title: 'Button',
                itemId: '/components/button',
                keywords: ['button'],
            },
            {
                title: 'IconButton',
                itemId: '/components/icon-button',
                keywords: ['button', 'icon'],
            },
            {
                title: 'MenuButton',
                itemId: '/components/menu-button',
                keywords: ['button'],
            },
            {
                title: 'TextField',
                itemId: '/components/text-field',
                keywords: ['input'],
            },
            {
                title: 'Checkbox',
                itemId: '/components/checkbox',
                keywords: ['checkbox'],
            },
            {
                title: 'NumberField',
                itemId: '/components/number-field',
                keywords: ['number'],
            },
            {
                title: 'DatePicker',
                itemId: '/components/date-picker',
                keywords: ['date', 'calendar'],
            },
            {
                title: 'Autocomplete',
                itemId: '/components/autocomplete',
                keywords: ['combo'],
            },
            {
                title: 'RadioButton',
                itemId: '/components/radio-button',
                keywords: ['radio'],
            },
            {
                title: 'TransferList',
                itemId: '/components/transfer-list',
                keywords: ['transferlist'],
            },
            {
                title: 'MaskField',
                itemId: '/components/mask-field',
                keywords: ['mask'],
            },
            {
                title: 'ShrinkableTransferList',
                itemId: '/components/shrinkable-transfer-list',
                keywords: ['autocomplete', 'transferlist', 'shrinkable'],
            },
            {
                title: 'FileInput',
                itemId: '/components/file-input',
                keywords: ['file', 'dropzone', 'drop-zone'],
            },
            {
                title: 'TimePicker',
                itemId: '/components/time-picker',
                keywords: ['time'],
            },
            {
                title: 'PhoneInput',
                itemId: '/components/phone-input',
                keywords: ['phone', 'telephone'],
            },
            {
                title: 'Table',
                itemId: '/components/table',
                keywords: ['table', 'datagrid'],
            },
            {
                title: 'Switch',
                itemId: '/components/switch',
                keywords: ['switch'],
            },
            {
                title: 'Dialog',
                itemId: '/components/dialog',
                keywords: ['dialog', 'draggable'],
            },
            {
                title: 'ConfirmDialog',
                itemId: '/components/confirm-dialog',
                keywords: ['dialog', 'draggable', 'confirm'],
            },
            {
                title: 'FormDialog',
                itemId: '/components/form-dialog',
                keywords: ['dialog', 'draggable', 'form'],
            },
        ],
    },
    {
        title: 'Validation',
        itemId: 'validatable-form-group',
        subNav: [
            {
                title: 'Custom Message',
                itemId: '/validatable-form/custom-message',
            },
            {
                title: 'Custom Translations',
                itemId: '/validatable-form/translations',
            },
            {
                title: 'tckn',
                itemId: '/validatable-form/tckn',
            },
            {
                title: 'phoneNumber',
                itemId: '/validatable-form/phone-number',
            },
            {
                title: 'time',
                itemId: '/validatable-form/time',
            },
            {
                title: 'vkn',
                itemId: '/validatable-form/vkn',
            },
        ],
    },
    {
        title: 'notistack',
        itemId: 'notistack-group',
        subNav: [
            {
                title: 'useSnackbar',
                itemId: '/notistack/use-snackbar',
                keywords: ['notistack'],
            },
            {
                title: 'API',
                itemId: '/notistack/use-snackbar-api',
                keywords: ['notistack', 'api'],
            },
        ],
    },
    {
        title: 'useApi',
        itemId: 'use-api-group',
        subNav: [
            {
                title: 'useApi',
                itemId: '/use-api/use-api',
                keywords: ['use-api', 'fetch', 'rest'],
            },
            {
                title: 'API',
                itemId: '/use-api/use-api-api',
                keywords: ['use-api', 'api'],
            },
        ],
    },
    {
        title: 'Examples',
        itemId: 'examples',
        subNav: [
            {
                title: 'List Items Example',
                itemId: '/examples/list-items',
                keywords: ['auto-complete', 'get', 'fetch', 'rest', 'list'],
            },
        ],
    },
    {
        title: 'comfort-react API',
        itemId: 'api-group',
        subNav: [
            {
                title: 'ComfortReactProvider',
                itemId: '/api/comfort-react-provider',
                keywords: [
                    'lang',
                    'customRules',
                    'translations',
                    'dateFormatterFunction',
                    'dateWithTimeFormatterFunction',
                    'hideBeforeSubmit',
                    'showAfterBlur',
                    'focusToErrorAfterSubmit',
                    'elementFocusHandler',
                ],
            },
        ],
    },
];

export const NavSidebar = ({ menuIsHidden, toggleDrawer }) => {
    const location = useLocation();
    const [searchInput, setSearchInput] = useState('');
    const [expanded, setExpanded] = useState('');

    useEffect(() => {
        setSearchInput('');
        if (location.pathname.includes('/getting-started/')) {
            setExpanded('getting-started-group');
        } else if (location.pathname.includes('/components/')) {
            setExpanded('components-group');
        } else if (location.pathname.includes('/validatable-form/')) {
            setExpanded('validatable-form-group');
        } else if (location.pathname.includes('/notistack/')) {
            setExpanded('notistack-group');
        } else if (location.pathname.includes('/use-api/')) {
            setExpanded('use-api-group');
        } else if (location.pathname.includes('/api/')) {
            setExpanded('api-group');
        } else if (location.pathname.includes('/examples/')) {
            setExpanded('examples');
        }
    }, [location]);

    const handleTextInput = (event) => {
        setSearchInput(event.target.value);
        if (event.target.value !== '') {
            setExpanded('open');
        } else {
            setExpanded('');
        }
    };

    const handleAccordionChange = (id) => {
        if (id === expanded) {
            setExpanded('');
        } else {
            setExpanded(id);
        }
    };

    const handleClickList = () => {
        toggleDrawer(false);
    };

    let filteredMenuItems = JSON.parse(JSON.stringify(allMenuItems));
    if (searchInput) {
        filteredMenuItems = filteredMenuItems.filter((m) => {
            let result = false;
            let searchInputUpper = searchInput.toUpperCase();
            if (m.subNav && m.subNav.length > 0) {
                let subsList = [];
                for (let i = 0; i < m.subNav.length; i++) {
                    const subEl = m.subNav[i];
                    const keywords = subEl.keywords || [];
                    if (
                        subEl.title.toUpperCase().includes(searchInputUpper) ||
                        subEl.title.replaceAll(/\s/g, '').toUpperCase().includes(searchInputUpper) ||
                        keywords.filter((k) => k.toUpperCase().includes(searchInputUpper)).length > 0
                    ) {
                        subsList.push(subEl);
                        result = true;
                    }
                }
                if (subsList && subsList.length > 0) {
                    m.subNav = subsList;
                }
            }
            return result;
        });
    }

    const accordionNavigations = filteredMenuItems.map((fm) => {
        return (
            <Accordion
                expanded={expanded === fm.itemId || expanded === 'open'}
                key={fm.itemId}
                onChange={() => handleAccordionChange(fm.itemId)}
            >
                <AccordionSummary aria-controls="panel1a-content" expandIcon={<ExpandMore />}>
                    <Typography> {fm.title} </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List disablePadding>
                        {fm.subNav.map((sn) => {
                            return (
                                <div
                                    className={location.pathname === sn.itemId ? 'selectedSideItem' : null}
                                    key={sn.itemId}
                                    onClick={handleClickList}
                                >
                                    <Link to={sn.itemId}>
                                        <ListItem button>
                                            <ListItemText primary={sn.title} />
                                        </ListItem>
                                    </Link>
                                </div>
                            );
                        })}
                    </List>
                </AccordionDetails>
            </Accordion>
        );
    });

    const menuStatus = menuIsHidden ? 'sideMenuHidden' : 'sideMenuOpen';

    return (
        <>
            <div
                className={`${menuStatus} mysidemenu inset-y-0 left-0 z-30 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${'ease-out translate-x-0'}`}
            >
                <div className="flex items-center justify-center text-center">
                    <TextField
                        className="menu-search-input"
                        label="Search"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        value={searchInput}
                        onChange={handleTextInput}
                    />
                </div>
                <Box flexGrow={1} pt={1}>
                    {accordionNavigations}
                </Box>
            </div>
        </>
    );
};
