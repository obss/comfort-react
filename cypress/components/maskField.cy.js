import { IMask } from 'react-imask';
import { ComfortReactProvider, MaskField } from '../../src/lib';

describe('MaskField tests', () => {
    it('mount test', () => {
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskField'} />
            </ComfortReactProvider>
        );
        cy.get('#maskField').should('be.visible');
    });
    it('variant test', () => {
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskFieldOutlined'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#maskFieldOutlined').get('input').should('have.css', 'padding-bottom', '16.5px');
        cy.get('#maskFieldOutlined').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#maskFieldOutlined').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#maskFieldOutlined').get('input').should('have.class', 'MuiOutlinedInput-input');
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskFieldFilled'} variant={'filled'} />
            </ComfortReactProvider>
        );
        cy.get('#maskFieldFilled').get('input').should('have.css', 'padding-bottom', '8px');
        cy.get('#maskFieldFilled').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#maskFieldFilled').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#maskFieldFilled').get('input').should('have.class', 'MuiFilledInput-input');
    });
    it('disabled test', () => {
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskField'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#maskField').should('not.be.disabled');
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskFieldDisabled'} variant={'outlined'} disabled={true} />
            </ComfortReactProvider>
        );
        cy.get('#maskFieldDisabled').should('be.disabled');
    });
    it('input style', () => {
        const INPUT_STYLE = { color: 'red' };
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskField'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#maskField').get('input').should('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskFieldStyled'} variant={'outlined'} InputProps={{ sx: INPUT_STYLE }} />
            </ComfortReactProvider>
        );
        cy.get('#maskFieldStyled').get('input').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
    it('blur test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskField'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#maskField').focus().blur();
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskFieldBlur'} variant={'outlined'} onBlur={handleBlur} />
            </ComfortReactProvider>
        );
        cy.get('#maskFieldBlur').focus().blur();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('placeholder test', () => {
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskField'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#maskField').click().should('not.have.attr', 'placeholder');
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskFieldPlaceholder'} variant={'outlined'} placeholder={'placeholder text'} />
            </ComfortReactProvider>
        );
        cy.get('#maskFieldPlaceholder').click().invoke('attr', 'placeholder').should('contain', 'placeholder text');
    });
    it('input test', () => {
        cy.mount(
            <ComfortReactProvider>
                <MaskField
                    id={'maskFieldDate'}
                    variant={'outlined'}
                    onChange={() => null}
                    maskFormat={'YYYY-MM-DD'}
                    blocks={{
                        YYYY: {
                            mask: IMask.MaskedRange,
                            from: 1900,
                            to: 2199,
                        },
                        MM: {
                            mask: IMask.MaskedRange,
                            from: 1,
                            to: 12,
                        },
                        DD: {
                            mask: IMask.MaskedRange,
                            from: 1,
                            to: 31,
                        },
                    }}
                />
            </ComfortReactProvider>
        );
        cy.get('#maskFieldDate').type('1999 08 08').should('have.value', '1999-08-08');
        cy.mount(
            <ComfortReactProvider>
                <MaskField
                    id={'maskFieldCreditCard'}
                    variant={'outlined'}
                    onChange={() => null}
                    maskFormat={'0000 0000 0000 0000'}
                />
            </ComfortReactProvider>
        );
        cy.get('#maskFieldCreditCard').type('1111222233334444').should('have.value', '1111 2222 3333 4444');
    });
    it('full width test', () => {
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskField'} variant={'outlined'} maskFormat={'0000 0000 0000 0000'} fullWidth={false} />
            </ComfortReactProvider>
        );
        cy.get('#maskField').get('div').should('not.have.class', 'MuiInputBase-fullWidth');
        cy.mount(
            <ComfortReactProvider>
                <MaskField id={'maskField'} variant={'outlined'} maskFormat={'0000 0000 0000 0000'} fullWidth={true} />
            </ComfortReactProvider>
        );
        cy.get('#maskField').get('div').should('have.class', 'MuiInputBase-fullWidth');
    });
});
