import { mount } from '@cypress/react';
import { ComfortReactProvider, NumberField } from '../../src/lib';

describe('NumberField tests', () => {
    it('mount test', () => {
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberField'} />
            </ComfortReactProvider>
        );
        cy.get('#numberField').should('be.visible');
    });
    it('variant test', () => {
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberFieldOutlined'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#numberFieldOutlined').get('input').should('have.css', 'padding-bottom', '16.5px');
        cy.get('#numberFieldOutlined').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#numberFieldOutlined').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#numberFieldOutlined').get('input').should('have.class', 'MuiOutlinedInput-input');
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberFieldFilled'} variant={'filled'} />
            </ComfortReactProvider>
        );
        cy.get('#numberFieldFilled').get('input').should('have.css', 'padding-bottom', '8px');
        cy.get('#numberFieldFilled').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#numberFieldFilled').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#numberFieldFilled').get('input').should('have.class', 'MuiFilledInput-input');
    });
    it('disabled test', () => {
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberField'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#numberField').should('not.be.disabled');
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberFieldDisabled'} variant={'outlined'} disabled={true} />
            </ComfortReactProvider>
        );
        cy.get('#numberFieldDisabled').should('be.disabled');
    });
    it('input style', () => {
        const INPUT_STYLE = { color: 'red' };
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberField'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#numberField').get('input').should('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberFieldStyled'} variant={'outlined'} InputProps={{ sx: INPUT_STYLE }} />
            </ComfortReactProvider>
        );
        cy.get('#numberFieldStyled').get('input').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
    it('blur test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberField'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#numberField').focus().blur();
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberFieldBlur'} variant={'outlined'} onBlur={handleBlur} />
            </ComfortReactProvider>
        );
        cy.get('#numberFieldBlur').focus().blur();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('placeholder test', () => {
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberField'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#numberField').click().should('not.have.attr', 'placeholder');
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberFieldPlaceholder'} variant={'outlined'} placeholder={'placeholder text'} />
            </ComfortReactProvider>
        );
        cy.get('#numberFieldPlaceholder').click().invoke('attr', 'placeholder').should('contain', 'placeholder text');
    });
    it('custom thousand seperator test', () => {
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberField'} variant={'outlined'} value={2131231} />
            </ComfortReactProvider>
        );
        cy.get('#numberField').get('input').should('have.value', '2.131.231');
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberFieldCustom'} variant={'outlined'} value={2131231} thousandSeparator={'*'} />
            </ComfortReactProvider>
        );
        cy.get('#numberFieldCustom').get('input').should('have.value', '2*131*231');
    });
    it('custom decimal seperator test', () => {
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberField'} variant={'outlined'} value={''} />
            </ComfortReactProvider>
        );
        cy.get('#numberField').get('input').type('0,213123').should('have.value', '0,213123');
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberFieldCustom'} variant={'outlined'} value={''} decimalSeparator={'*'} />
            </ComfortReactProvider>
        );
        cy.get('#numberFieldCustom').get('input').type('0*213123').should('have.value', '0*213123');
    });
    it('full width test', () => {
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberField'} variant={'outlined'} fullWidth={false} />
            </ComfortReactProvider>
        );
        cy.get('#numberField').get('div').should('not.have.class', 'MuiInputBase-fullWidth');
        mount(
            <ComfortReactProvider>
                <NumberField id={'numberField'} variant={'outlined'} fullWidth={true} />
            </ComfortReactProvider>
        );
        cy.get('#numberField').get('div').should('have.class', 'MuiInputBase-fullWidth');
    });
});
