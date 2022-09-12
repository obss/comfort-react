import { ComfortReactProvider, TextField } from '../../src/lib';

describe('textField tests', () => {
    it('mount test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textField'} />
            </ComfortReactProvider>
        );
        cy.get('#textField').should('be.visible');
    });
    it('disabled test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textField'} disabled={false} />
            </ComfortReactProvider>
        );
        cy.get('#textField').should('not.be.disabled');
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldDisabled'} disabled={true} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldDisabled').should('be.disabled');
    });
    it('blurred test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textField'} />
            </ComfortReactProvider>
        );
        cy.get('#textField').focus().blur();
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldBlur'} onBlur={handleBlur} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldBlur').focus().blur();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('placeholder test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textField'} />
            </ComfortReactProvider>
        );
        cy.get('#textField').click().should('not.have.attr', 'placeholder');
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldPlaceholder'} placeholder={'placeholder text'} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldPlaceholder').click().invoke('attr', 'placeholder').should('contain', 'placeholder text');
    });
    it('variant test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldOutlined'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldOutlined').get('input').should('have.css', 'padding-bottom', '16.5px');
        cy.get('#textFieldOutlined').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#textFieldOutlined').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#textFieldOutlined').get('input').should('have.class', 'MuiOutlinedInput-input');
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldFilled'} variant={'filled'} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldFilled').get('input').should('have.css', 'padding-bottom', '8px');
        cy.get('#textFieldFilled').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#textFieldFilled').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#textFieldFilled').get('input').should('have.class', 'MuiFilledInput-input');
    });
    it('type test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldText'} variant={'outlined'} type={'text'} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldText').should('have.attr', 'type', 'text');
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldPassword'} variant={'outlined'} type={'password'} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldPassword').should('have.attr', 'type', 'password');
    });
    it('multiline test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldText'} variant={'outlined'} type={'text'} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldText').get('input');
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldText'} variant={'outlined'} type={'text'} multiline={true} rows={5} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldText').get('textarea');
        cy.get('#textFieldText').get('textarea').should('have.attr', 'rows', 5);
    });
    it('max length test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TextField
                    id={'textFieldText'}
                    variant={'outlined'}
                    type={'text'}
                    multiline={true}
                    value={'value'}
                    rows={5}
                    inputProps={{ maxLength: 3000 }}
                />
            </ComfortReactProvider>
        );
        cy.get('#textFieldText').get('textarea').should('have.attr', 'maxLength', 3000);
        cy.get('#textFieldText').get('.MuiTypography-root').contains('2995');
    });
    it('password icon test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldText'} variant={'outlined'} type={'password'} hidePasswordVisibility={false} />
            </ComfortReactProvider>
        );
        cy.get('[data-testid="VisibilityIcon"]').should('exist');
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldText'} variant={'outlined'} type={'password'} hidePasswordVisibility={true} />
            </ComfortReactProvider>
        );
        cy.get('[data-testid="VisibilityIcon"]').should('not.exist');
    });
    it('input style', () => {
        const INPUT_STYLE = { color: 'red' };
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldText'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldText').get('input').should('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldTextStyled'} variant={'outlined'} InputProps={{ sx: INPUT_STYLE }} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldTextStyled').get('input').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
    it('fullwidth test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldText'} variant={'outlined'} fullWidth={false} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldText').get('div').should('not.have.class', 'MuiFormControl-fullWidth');
        cy.mount(
            <ComfortReactProvider>
                <TextField id={'textFieldText'} variant={'outlined'} fullWidth={true} />
            </ComfortReactProvider>
        );
        cy.get('#textFieldText').get('div').should('have.class', 'MuiFormControl-fullWidth');
    });
});
