import { mount } from '@cypress/react';
import { TextField } from '../../src/lib';

describe('textField tests', () => {
    it('mount test', () => {
        mount(<TextField id={'textField'} />);
        cy.get('#textField').should('be.visible');
    });
    it('disabled test', () => {
        mount(<TextField id={'textField'} disabled={false} />);
        cy.get('#textField').should('not.be.disabled');
        mount(<TextField id={'textFieldDisabled'} disabled={true} />);
        cy.get('#textFieldDisabled').should('be.disabled');
    });
    it('blurred test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        mount(<TextField id={'textField'} />);
        cy.get('#textField').focus().blur();
        mount(<TextField id={'textFieldBlur'} onBlur={handleBlur} />);
        cy.get('#textFieldBlur').focus().blur();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('placeholder test', () => {
        mount(<TextField id={'textField'} />);
        cy.get('#textField').click().should('not.have.attr', 'placeholder');
        mount(<TextField id={'textFieldPlaceholder'} placeholder={'placeholder text'} />);
        cy.get('#textFieldPlaceholder').click().invoke('attr', 'placeholder').should('contain', 'placeholder text');
    });
    it('variant test', () => {
        mount(<TextField id={'textFieldOutlined'} variant={'outlined'} />);
        cy.get('#textFieldOutlined').get('input').should('have.css', 'padding-bottom', '16.5px');
        cy.get('#textFieldOutlined').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#textFieldOutlined').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#textFieldOutlined').get('input').should('have.class', 'MuiOutlinedInput-input');
        mount(<TextField id={'textFieldFilled'} variant={'filled'} />);
        cy.get('#textFieldFilled').get('input').should('have.css', 'padding-bottom', '8px');
        cy.get('#textFieldFilled').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#textFieldFilled').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#textFieldFilled').get('input').should('have.class', 'MuiFilledInput-input');
    });
    it('type test', () => {
        mount(<TextField id={'textFieldText'} variant={'outlined'} type={'text'} />);
        cy.get('#textFieldText').should('have.attr', 'type', 'text');
        mount(<TextField id={'textFieldPassword'} variant={'outlined'} type={'password'} />);
        cy.get('#textFieldPassword').should('have.attr', 'type', 'password');
    });
    it('multiline test', () => {
        mount(<TextField id={'textFieldText'} variant={'outlined'} type={'text'} />);
        cy.get('#textFieldText').get('input');
        mount(<TextField id={'textFieldText'} variant={'outlined'} type={'text'} multiline={true} rows={5} />);
        cy.get('#textFieldText').get('textarea');
        cy.get('#textFieldText').get('textarea').should('have.attr', 'rows', 5);
    });
    it('max length test', () => {
        mount(
            <TextField
                id={'textFieldText'}
                variant={'outlined'}
                type={'text'}
                multiline={true}
                value={'value'}
                rows={5}
                inputProps={{ maxLength: 3000 }}
            />
        );
        cy.get('#textFieldText').get('textarea').should('have.attr', 'maxLength', 3000);
        cy.get('#textFieldText').get('.MuiTypography-root').contains('2995');
    });
    it('password icon test', () => {
        mount(<TextField id={'textFieldText'} variant={'outlined'} type={'password'} hidePasswordVisibility={false} />);
        cy.get('[data-testid="VisibilityIcon"]').should('exist');
        mount(<TextField id={'textFieldText'} variant={'outlined'} type={'password'} hidePasswordVisibility={true} />);
        cy.get('[data-testid="VisibilityIcon"]').should('not.exist');
    });
    it('input style', () => {
        const INPUT_STYLE = { color: 'red' };
        mount(<TextField id={'textFieldText'} variant={'outlined'} />);
        cy.get('#textFieldText').get('input').should('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
        mount(<TextField id={'textFieldTextStyled'} variant={'outlined'} InputProps={{ sx: INPUT_STYLE }} />);
        cy.get('#textFieldTextStyled').get('input').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
    it('fullwidth test', () => {
        mount(<TextField id={'textFieldText'} variant={'outlined'} fullWidth={false} />);
        cy.get('#textFieldText').get('div').should('not.have.class', 'MuiFormControl-fullWidth');
        mount(<TextField id={'textFieldText'} variant={'outlined'} fullWidth={true} />);
        cy.get('#textFieldText').get('div').should('have.class', 'MuiFormControl-fullWidth');
    });
});
