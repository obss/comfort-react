import { mount } from '@cypress/react';
import { MaskField } from '../../src/lib';

describe('MaskField tests', () => {
    it('mount test', () => {
        mount(<MaskField id={'maskField'} />);
        cy.get('#maskField').should('be.visible');
    });
    it('variant test', () => {
        mount(<MaskField id={'maskFieldOutlined'} variant={'outlined'} />);
        cy.get('#maskFieldOutlined').get('input').should('have.css', 'padding-bottom', '16.5px');
        cy.get('#maskFieldOutlined').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#maskFieldOutlined').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#maskFieldOutlined').get('input').should('have.class', 'MuiOutlinedInput-input');
        mount(<MaskField id={'maskFieldFilled'} variant={'filled'} />);
        cy.get('#maskFieldFilled').get('input').should('have.css', 'padding-bottom', '8px');
        cy.get('#maskFieldFilled').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#maskFieldFilled').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#maskFieldFilled').get('input').should('have.class', 'MuiFilledInput-input');
    });
    it('disabled test', () => {
        mount(<MaskField id={'maskField'} variant={'outlined'} />);
        cy.get('#maskField').should('not.be.disabled');
        mount(<MaskField id={'maskFieldDisabled'} variant={'outlined'} disabled={true} />);
        cy.get('#maskFieldDisabled').should('be.disabled');
    });
    it('input style', () => {
        const INPUT_STYLE = { color: 'red' };
        mount(<MaskField id={'maskField'} variant={'outlined'} />);
        cy.get('#maskField').get('input').should('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
        mount(<MaskField id={'maskFieldStyled'} variant={'outlined'} InputProps={{ sx: INPUT_STYLE }} />);
        cy.get('#maskFieldStyled').get('input').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
    it('blur test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        mount(<MaskField id={'maskField'} variant={'outlined'} />);
        cy.get('#maskField').focus().blur();
        mount(<MaskField id={'maskFieldBlur'} variant={'outlined'} onBlur={handleBlur} />);
        cy.get('#maskFieldBlur').focus().blur();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('placeholder test', () => {
        mount(<MaskField id={'maskField'} variant={'outlined'} />);
        cy.get('#maskField').click().should('not.have.attr', 'placeholder');
        mount(<MaskField id={'maskFieldPlaceholder'} variant={'outlined'} placeholder={'placeholder text'} />);
        cy.get('#maskFieldPlaceholder').click().invoke('attr', 'placeholder').should('contain', 'placeholder text');
    });
    it('input test', () => {
        mount(
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
        );
        cy.get('#maskFieldDate').type('1999 08 08').should('have.value', '1999-08-08');
        mount(
            <MaskField
                id={'maskFieldCreditCard'}
                variant={'outlined'}
                onChange={() => null}
                maskFormat={'0000 0000 0000 0000'}
            />
        );
        cy.get('#maskFieldCreditCard').type('1111222233334444').should('have.value', '1111 2222 3333 4444');
    });
    it('full width test', () => {
        mount(<MaskField id={'maskField'} variant={'outlined'} maskFormat={'0000 0000 0000 0000'} fullWidth={false} />);
        cy.get('#maskField').get('div').should('not.have.class', 'MuiInputBase-fullWidth');
        mount(<MaskField id={'maskField'} variant={'outlined'} maskFormat={'0000 0000 0000 0000'} fullWidth={true} />);
        cy.get('#maskField').get('div').should('have.class', 'MuiInputBase-fullWidth');
    });
});
