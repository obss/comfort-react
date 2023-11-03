import { mount } from '@cypress/react';
import { ComfortReactProvider, PhoneInput } from '../../src/lib';

describe('phoneInput tests', () => {
    it('mount test', () => {
        mount(
            <ComfortReactProvider>
                <PhoneInput id={'phoneInput'} />
            </ComfortReactProvider>
        );
        cy.get('#phoneInput').should('be.visible');
    });
    it('disabled test', () => {
        mount(
            <ComfortReactProvider>
                <PhoneInput id={'phoneInput'} disabled={false} />
            </ComfortReactProvider>
        );
        cy.get('#phoneInput input').should('not.be.disabled');
        mount(
            <ComfortReactProvider>
                <PhoneInput id={'phoneInputDisabled'} disabled={true} />
            </ComfortReactProvider>
        );
        cy.get('#phoneInputDisabled input').should('be.disabled');
    });
    it('blurred test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        mount(
            <ComfortReactProvider>
                <PhoneInput id={'phoneInput'} />
            </ComfortReactProvider>
        );
        cy.get('#phoneInput input').focus().blur();
        mount(
            <ComfortReactProvider>
                <PhoneInput id={'phoneInputBlur'} onBlur={handleBlur} />
            </ComfortReactProvider>
        );
        cy.get('#phoneInputBlur input').focus().blur();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('placeholder test', () => {
        mount(
            <ComfortReactProvider>
                <PhoneInput id={'phoneInput'} placeholder={null} />
            </ComfortReactProvider>
        );
        cy.get('#phoneInput').get('input').click().should('not.have.attr', 'placeholder');
        mount(
            <ComfortReactProvider>
                <PhoneInput id={'phoneInputPlaceholder'} placeholder={'placeholder text'} />
            </ComfortReactProvider>
        );
        cy.get('#phoneInputPlaceholder')
            .get('input')
            .click()
            .invoke('attr', 'placeholder')
            .should('contain', 'placeholder text');
    });
    it('input style test', () => {
        const INPUT_STYLE = { color: 'red' };
        mount(
            <ComfortReactProvider>
                <PhoneInput id={'phoneInputText'} />
            </ComfortReactProvider>
        );
        cy.get('#phoneInputText').get('input').should('have.css', 'color', 'rgb(0, 0, 0)');
        mount(
            <ComfortReactProvider>
                <PhoneInput id={'phoneInputTextStyled'} inputProps={{ style: INPUT_STYLE }} />
            </ComfortReactProvider>
        );
        cy.get('#phoneInputTextStyled').get('input').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
    it('input test', () => {
        let value = '';
        mount(
            <ComfortReactProvider>
                <PhoneInput id={'phoneInputText'} value={value} onChange={(newValue) => (value = newValue)} />
            </ComfortReactProvider>
        );
        cy.get('.selected-flag').click();
        cy.get('[data-flag-key="flag_no_0"]').click();
        value = '3858358253234';
        cy.get('#phoneInputText').get('input').type(value);
        cy.get('#phoneInputText').get('input').should('have.value', '+93 385 835 825 323 4');
    });
    it('full width test', () => {
        mount(
            <ComfortReactProvider>
                <PhoneInput id={'phoneInput'} fullWidth={false} />
            </ComfortReactProvider>
        );
        cy.get('#phoneInput').should('not.have.class', 'fullWidth');
        mount(
            <ComfortReactProvider>
                <PhoneInput id={'phoneInput'} fullWidth={true} />
            </ComfortReactProvider>
        );
        cy.get('#phoneInput').should('have.class', 'fullWidth');
    });
});
