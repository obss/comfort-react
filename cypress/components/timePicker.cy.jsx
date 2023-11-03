import { ComfortReactProvider, TimePicker } from '../../src/lib';

describe('TimePicker tests', () => {
    it('mount test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePicker'} />
            </ComfortReactProvider>
        );
        cy.get('#timePicker').should('be.visible');
    });
    it('variant test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePickerOutlined'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#timePickerOutlined').get('input').should('have.css', 'padding-bottom', '16.5px');
        cy.get('#timePickerOutlined').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#timePickerOutlined').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#timePickerOutlined').get('input').should('have.class', 'MuiOutlinedInput-input');
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePickerFilled'} variant={'filled'} />
            </ComfortReactProvider>
        );
        cy.get('#timePickerFilled').get('input').should('have.css', 'padding-bottom', '8px');
        cy.get('#timePickerFilled').get('input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('#timePickerFilled').get('input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('#timePickerFilled').get('input').should('have.class', 'MuiFilledInput-input');
    });
    it('disabled test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePicker'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#timePicker').should('not.be.disabled');
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePickerDisabled'} variant={'outlined'} disabled={true} />
            </ComfortReactProvider>
        );
        cy.get('#timePickerDisabled').should('be.disabled');
    });
    it('input style', () => {
        const INPUT_STYLE = { color: 'red' };
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePicker'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#timePicker').get('input').should('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePickerStyled'} variant={'outlined'} InputProps={{ sx: INPUT_STYLE }} />
            </ComfortReactProvider>
        );
        cy.get('#timePickerStyled').get('input').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
    it('blur test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePicker'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#timePicker').focus().blur();
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePickerBlur'} variant={'outlined'} onBlur={handleBlur} />
            </ComfortReactProvider>
        );
        cy.get('#timePickerBlur').focus().blur();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('placeholder test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePicker'} variant={'outlined'} />
            </ComfortReactProvider>
        );
        cy.get('#timePicker').click().should('not.have.attr', 'placeholder');
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePickerPlaceholder'} variant={'outlined'} placeholder={'placeholder text'} />
            </ComfortReactProvider>
        );
        cy.get('#timePickerPlaceholder').click().invoke('attr', 'placeholder').should('contain', 'placeholder text');
    });
    it('input test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePicker'} variant={'outlined'} onChange={() => null} />
            </ComfortReactProvider>
        );
        cy.get('#timePicker').type('23:12').should('have.value', '23:12');
        cy.get('#timePicker').type('253:172').should('have.value', '23:12');
    });
    it('full width test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePicker'} variant={'outlined'} fullWidth={false} />
            </ComfortReactProvider>
        );
        cy.get('#timePicker').get('div').should('not.have.class', 'MuiInputBase-fullWidth');
        cy.mount(
            <ComfortReactProvider>
                <TimePicker id={'timePicker'} variant={'outlined'} fullWidth={true} />
            </ComfortReactProvider>
        );
        cy.get('#timePicker').get('div').should('have.class', 'MuiInputBase-fullWidth');
    });
});
