import { mount } from '@cypress/react';
import { IconButton } from '../../src/lib';
import { SendOutlined } from '@mui/icons-material';

const BUTTON_STYLE = { backgroundColor: 'red', color: 'black' };

describe('Button tests', () => {
    it('mount test', () => {
        mount(
            <IconButton id={'button'}>
                {' '}
                <SendOutlined />{' '}
            </IconButton>
        );
        cy.get('#button').should('be.visible');
    });

    it('disabled tests', () => {
        mount(
            <IconButton id={'button'} disabled={true}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#button').should('be.disabled');
        mount(
            <IconButton id={'button'} disabled={false}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#button').should('not.be.disabled');
    });

    it('color tests', () => {
        mount(
            <IconButton id={'button'} variant={'contained'} color={'primary'}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#button').should('have.css', 'color', 'rgb(25, 118, 210)');
        mount(
            <IconButton id={'button'} variant={'contained'} color={'secondary'}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#button').should('have.css', 'color', 'rgb(156, 39, 176)');
        mount(
            <IconButton id={'button'} variant={'contained'} color={'success'}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#button').should('have.css', 'color', 'rgb(46, 125, 50)');
        mount(
            <IconButton id={'button'} variant={'contained'} color={'error'}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#button').should('have.css', 'color', 'rgb(211, 47, 47)');
        mount(
            <IconButton id={'button'} variant={'contained'} color={'info'}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#button').should('have.css', 'color', 'rgb(2, 136, 209)');
        mount(
            <IconButton id={'button'} variant={'contained'} color={'warning'}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#button').should('have.css', 'color', 'rgb(237, 108, 2)');
        mount(
            <IconButton id={'button'} variant={'contained'} color={'inherit'}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#button').should('have.css', 'color', 'rgb(0, 0, 0)');
    });

    it('size tests', () => {
        mount(
            <IconButton id={'buttonMedium'} variant={'contained'} size={'medium'}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#buttonMedium').should('have.css', 'font-size', '24px');
        cy.get('#buttonMedium').should('have.css', 'padding-left', '8px');
        cy.get('#buttonMedium').should('have.css', 'padding-right', '8px');
        cy.get('#buttonMedium').should('have.css', 'padding-top', '8px');
        cy.get('#buttonMedium').should('have.css', 'padding-bottom', '8px');
        mount(
            <IconButton id={'buttonLarge'} variant={'contained'} size={'large'}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#buttonLarge').should('have.css', 'font-size', '28px');
        cy.get('#buttonLarge').should('have.css', 'padding-left', '12px');
        cy.get('#buttonLarge').should('have.css', 'padding-right', '12px');
        cy.get('#buttonLarge').should('have.css', 'padding-top', '12px');
        cy.get('#buttonLarge').should('have.css', 'padding-bottom', '12px');
    });

    it('loading tests', () => {
        mount(
            <IconButton id={'button'} variant={'contained'} loading={false}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#button').should('have.css', 'cursor', 'pointer');
        cy.get('#button').should('have.css', 'color', 'rgba(0, 0, 0, 0.54)');
        mount(
            <IconButton id={'buttonLoading'} variant={'contained'} loading={true}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#buttonLoading').should('have.css', 'cursor', 'default');
        cy.get('#buttonLoading').should('have.css', 'color', 'rgba(0, 0, 0, 0.26)');
    });

    it('custom style', () => {
        mount(
            <IconButton id={'button'} variant={'contained'}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#button').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#button').should('have.css', 'color', 'rgba(0, 0, 0, 0.54)');
        mount(
            <IconButton id={'buttonCustom'} variant={'contained'} style={BUTTON_STYLE}>
                <SendOutlined />
            </IconButton>
        );
        cy.get('#buttonCustom').should('have.css', 'background-color', 'rgb(255, 0, 0)');
        cy.get('#buttonCustom').should('have.css', 'color', 'rgb(0, 0, 0)');
    });
});
