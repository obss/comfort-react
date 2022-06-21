import { mount } from '@cypress/react';
import { TimePicker } from '../../src/lib';

describe('TimePicker tests', () => {
    it('mount test', () => {
        mount(<TimePicker id={'timePicker'} />);
        cy.get('#timePicker').should('be.visible');
    });
    it('variant test', () => {
        mount(<TimePicker id={'timePickerOutlined'} variant={'outlined'} />);
        cy.get('#timePickerOutlined').get('input').should('have.css', 'padding-bottom', '16.5px');
        cy.get('#timePickerOutlined').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#timePickerOutlined').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#timePickerOutlined').get('input').should('have.class', 'MuiOutlinedInput-input');
        mount(<TimePicker id={'timePickerFilled'} variant={'filled'} />);
        cy.get('#timePickerFilled').get('input').should('have.css', 'padding-bottom', '8px');
        cy.get('#timePickerFilled').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#timePickerFilled').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#timePickerFilled').get('input').should('have.class', 'MuiFilledInput-input');
    });
    it('disabled test', () => {
        mount(<TimePicker id={'timePicker'} variant={'outlined'} />);
        cy.get('#timePicker').should('not.be.disabled');
        mount(<TimePicker id={'timePickerDisabled'} variant={'outlined'} disabled={true} />);
        cy.get('#timePickerDisabled').should('be.disabled');
    });
    it('input style', () => {
        const INPUT_STYLE = { color: 'red' };
        mount(<TimePicker id={'timePicker'} variant={'outlined'} />);
        cy.get('#timePicker').get('input').should('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
        mount(<TimePicker id={'timePickerStyled'} variant={'outlined'} InputProps={{ sx: INPUT_STYLE }} />);
        cy.get('#timePickerStyled').get('input').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
    it('blur test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        mount(<TimePicker id={'timePicker'} variant={'outlined'} />);
        cy.get('#timePicker').focus().blur();
        mount(<TimePicker id={'timePickerBlur'} variant={'outlined'} onBlur={handleBlur} />);
        cy.get('#timePickerBlur').focus().blur();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('placeholder test', () => {
        mount(<TimePicker id={'timePicker'} variant={'outlined'} />);
        cy.get('#timePicker').click().should('not.have.attr', 'placeholder');
        mount(<TimePicker id={'timePickerPlaceholder'} variant={'outlined'} placeholder={'placeholder text'} />);
        cy.get('#timePickerPlaceholder').click().invoke('attr', 'placeholder').should('contain', 'placeholder text');
    });
    it('input test', () => {
        mount(<TimePicker id={'timePicker'} variant={'outlined'} onChange={() => null} />);
        cy.get('#timePicker').type('23:12').should('have.value', '23:12');
        cy.get('#timePicker').type('253:172').should('have.value', '23:12');
    });
    it('full width test', () => {
      mount(<TimePicker id={'timePicker'} variant={'outlined'} fullWidth={false} />);
      cy.get('#timePicker').get('div').should('not.have.class', 'MuiInputBase-fullWidth');
      mount(<TimePicker id={'timePicker'} variant={'outlined'} fullWidth={true} />);
      cy.get('#timePicker').get('div').should('have.class', 'MuiInputBase-fullWidth');
    });
});
