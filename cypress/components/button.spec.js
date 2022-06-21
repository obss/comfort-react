import { mount } from '@cypress/react';
import { Button } from '../../src/lib';
import { SendOutlined } from '@mui/icons-material';

const BUTTON_STYLE = { backgroundColor: 'red', color: 'black' };

describe('Button tests', () => {
    it('mount test', () => {
        mount(<Button id={'button'}> Button </Button>);
        cy.get('#button').should('be.visible');
    });

    it('variant test', () => {
        mount(
            <Button id={'buttonContained'} variant={'contained'}>
                Button
            </Button>
        );
        cy.get('#buttonContained').should('have.css', 'background-color', 'rgb(25, 118, 210)');
        cy.get('#buttonContained').should('have.css', 'color', 'rgb(255, 255, 255)');
        mount(
            <Button id={'buttonOutlined'} variant={'outlined'}>
                Button
            </Button>
        );
        cy.get('#buttonOutlined').should('have.css', 'color', 'rgb(25, 118, 210)');
        cy.get('#buttonOutlined').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    });
    it('disabled tests', () => {
        mount(
            <Button id={'button'} disabled={true}>
                Button
            </Button>
        );
        cy.get('#button').should('be.disabled');
        mount(
            <Button id={'button'} disabled={false}>
                Button
            </Button>
        );
        cy.get('#button').should('not.be.disabled');
    });

    it('color tests', () => {
        mount(
            <Button id={'button'} variant={'contained'} color={'primary'}>
                Button
            </Button>
        );
        cy.get('#button').should('have.css', 'background-color', 'rgb(25, 118, 210)');
        mount(
            <Button id={'button'} variant={'contained'} color={'secondary'}>
                Button
            </Button>
        );
        cy.get('#button').should('have.css', 'background-color', 'rgb(156, 39, 176)');
        mount(
            <Button id={'button'} variant={'contained'} color={'success'}>
                Button
            </Button>
        );
        cy.get('#button').should('have.css', 'background-color', 'rgb(46, 125, 50)');
        mount(
            <Button id={'button'} variant={'contained'} color={'error'}>
                Button
            </Button>
        );
        cy.get('#button').should('have.css', 'background-color', 'rgb(211, 47, 47)');
        mount(
            <Button id={'button'} variant={'contained'} color={'info'}>
                Button
            </Button>
        );
        cy.get('#button').should('have.css', 'background-color', 'rgb(2, 136, 209)');
        mount(
            <Button id={'button'} variant={'contained'} color={'warning'}>
                Button
            </Button>
        );
        cy.get('#button').should('have.css', 'background-color', 'rgb(237, 108, 2)');
        mount(
            <Button id={'button'} variant={'contained'} color={'inherit'}>
                Button
            </Button>
        );
        cy.get('#button').should('have.css', 'background-color', 'rgb(224, 224, 224)');
    });

    it('size tests', () => {
        mount(
            <Button id={'buttonMedium'} variant={'contained'} size={'medium'}>
                Button
            </Button>
        );
        cy.get('#buttonMedium').should('have.css', 'font-size', '14px');
        cy.get('#buttonMedium').should('have.css', 'padding-left', '16px');
        cy.get('#buttonMedium').should('have.css', 'padding-right', '16px');
        cy.get('#buttonMedium').should('have.css', 'padding-top', '6px');
        cy.get('#buttonMedium').should('have.css', 'padding-bottom', '6px');
        mount(
            <Button id={'buttonLarge'} variant={'contained'} size={'large'}>
                Button
            </Button>
        );
        cy.get('#buttonLarge').should('have.css', 'font-size', '15px');
        cy.get('#buttonLarge').should('have.css', 'padding-left', '22px');
        cy.get('#buttonLarge').should('have.css', 'padding-right', '22px');
        cy.get('#buttonLarge').should('have.css', 'padding-top', '8px');
        cy.get('#buttonLarge').should('have.css', 'padding-bottom', '8px');
    });

    it('loading tests', () => {
        mount(
            <Button id={'button'} variant={'contained'} loading={false}>
                Button
            </Button>
        );
        cy.get('#button').should('have.css', 'background-color', 'rgb(25, 118, 210)');
        cy.get('#button').should('have.css', 'cursor', 'pointer');
        cy.get('#button').should('have.css', 'color', 'rgb(255, 255, 255)');
        mount(
            <Button id={'buttonLoading'} variant={'contained'} loading={true}>
                Button
            </Button>
        );
        cy.get('#buttonLoading').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.12)');
        cy.get('#buttonLoading').should('have.css', 'cursor', 'default');
        cy.get('#buttonLoading').should('have.css', 'color', 'rgba(0, 0, 0, 0)');
    });

    it('icon test', () => {
        mount(
            <Button id={'button'} variant={'contained'}>
                Button
            </Button>
        );
        cy.get('#button').get('span');
        mount(
            <Button id={'buttonIcon'} variant={'contained'} endIcon={<SendOutlined />}>
                Button
            </Button>
        );
        cy.get('#buttonIcon').get('span');
    });

    it('custom style', () => {
        mount(
            <Button id={'button'} variant={'contained'}>
                Button
            </Button>
        );
        cy.get('#button').should('have.css', 'background-color', 'rgb(25, 118, 210)');
        cy.get('#button').should('have.css', 'color', 'rgb(255, 255, 255)');
        mount(
            <Button id={'buttonCustom'} variant={'contained'} style={BUTTON_STYLE}>
                Button
            </Button>
        );
        cy.get('#buttonCustom').should('have.css', 'background-color', 'rgb(255, 0, 0)');
        cy.get('#buttonCustom').should('have.css', 'color', 'rgb(0, 0, 0)');
    });
});
