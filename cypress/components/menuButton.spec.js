import { mount } from '@cypress/react';
import { Checkbox, MenuButton } from '../../src/lib';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { FilterList } from '@mui/icons-material';

describe('Menu Button tests', () => {
    it('mount test', () => {
        mount(
            <MenuButton className={'menuButton'} menuChildren={menuItemsJSX()}>
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton').should('exist');
    });
    it('disabled test', () => {
        mount(
            <MenuButton className={'menuButton'} buttonProps={{ disabled: false }} menuChildren={menuItemsJSX()}>
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton button').should('not.be.disabled');
        mount(
            <MenuButton className={'menuButton'} buttonProps={{ disabled: true }} menuChildren={menuItemsJSX()}>
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton button').should('be.disabled');
    });
    it('loading test', () => {
        mount(
            <MenuButton className={'menuButton'} buttonProps={{ loading: false }} menuChildren={menuItemsJSX()}>
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton button').should('have.css', 'color', 'rgb(25, 118, 210)');
        cy.get('.menuButton button').should('have.css', 'cursor', 'pointer');
        mount(
            <MenuButton className={'menuButtonLoading'} buttonProps={{ loading: true }} menuChildren={menuItemsJSX()}>
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButtonLoading button div').should('have.css', 'color', 'rgba(0, 0, 0, 0.26)');
        cy.get('.menuButtonLoading button').should('have.css', 'cursor', 'default');
    });
    it('icon test', () => {
        mount(
            <MenuButton className={'menuButton'} isIconButton={false} menuChildren={menuItemsJSX()}>
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton .ComfortButton ').should('exist');
        mount(
            <MenuButton className={'menuButton'} isIconButton={true} menuChildren={menuItemsJSX()}>
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton .ComfortIconButton ').should('exist');
    });
    it('anchor test', () => {
        mount(
            <MenuButton
                className={'menuButton'}
                menuProps={{ anchorOrigin: { vertical: 'top', horizontal: 'left' } }}
                menuChildren={menuItemsJSX()}
            >
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton button').click();
        cy.get('.MuiModal-root .MuiMenu-paper').should('have.css', 'transform-origin', '-8px -8px');
        mount(
            <MenuButton
                className={'menuButton'}
                menuProps={{ anchorOrigin: { vertical: 'top', horizontal: 'right' } }}
                menuChildren={menuItemsJSX()}
            >
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton button').click();
        cy.get('.MuiModal-root .MuiMenu-paper').should('have.css', 'transform-origin', '56px -8px');
        mount(
            <MenuButton
                className={'menuButton'}
                menuProps={{ anchorOrigin: { vertical: 'bottom', horizontal: 'right' } }}
                menuChildren={menuItemsJSX()}
            >
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton button').click();
        cy.get('.MuiModal-root .MuiMenu-paper').should('have.css', 'transform-origin', '56px 0px');
    });
    it('transform test', () => {
        mount(
            <MenuButton
                className={'menuButton'}
                menuProps={{ transformOrigin: { vertical: 'top', horizontal: 'left' } }}
                menuChildren={menuItemsJSX()}
            >
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton button').click();
        cy.get('.MuiModal-root .MuiMenu-paper').should('have.css', 'transform-origin', '0px 0px');
        mount(
            <MenuButton
                className={'menuButton'}
                menuProps={{ transformOrigin: { vertical: 'top', horizontal: 'right' } }}
                menuChildren={menuItemsJSX()}
            >
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton button').click();
        cy.get('.MuiModal-root .MuiMenu-paper').should('have.css', 'transform-origin', '24px 0px');
        mount(
            <MenuButton
                className={'menuButton'}
                menuProps={{ transformOrigin: { vertical: 'bottom', horizontal: 'right' } }}
                menuChildren={menuItemsJSX()}
            >
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton button').click();
        cy.get('.MuiModal-root .MuiMenu-paper').should('have.css', 'transform-origin', '24px 28px');
    });
    it('transition test', () => {
        mount(
            <MenuButton className={'menuButton'} menuChildren={menuItemsJSX()}>
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton button').click();
        cy.get('.MuiModal-root .MuiMenu-paper').should('have.css', 'transition-duration', '0.274s, 0.182s');
        mount(
            <MenuButton
                className={'menuButton'}
                menuProps={{ transitionDuration: { enter: 100, exit: 1000 } }}
                menuChildren={menuItemsJSX()}
            >
                <FilterList />
            </MenuButton>
        );
        cy.get('.menuButton button').click();
        cy.get('.MuiModal-root .MuiMenu-paper').should('have.css', 'transition-duration', '0.1s, 0.067s');
    });
});

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

const menuItemsJSX = () => {
    return MENU_ITEMS.map((element) => {
        return (
            <MenuItem key={element.key} onClick={() => alert(element.key)}>
                <ListItemIcon>
                    <Checkbox noLabel value={element.selected} tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText primary={element.value} />
            </MenuItem>
        );
    });
};
