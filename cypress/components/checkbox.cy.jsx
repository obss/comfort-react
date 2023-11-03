import { pink } from '@mui/material/colors';
import { Checkbox, ComfortReactProvider } from '../../src/lib';

describe('checkbox tests', () => {
    it('mount test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkbox'} label={'label text'} />
            </ComfortReactProvider>
        );
        cy.get('#checkbox').should('be.visible');
    });
    it('size test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkbox'} label={'label text'} />
            </ComfortReactProvider>
        );
        cy.get('#checkbox').get('span > svg').should('have.css', 'font-size', '24px');
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkboxLarge'} label={'label text'} size={'large'} />
            </ComfortReactProvider>
        );
        cy.get('#checkboxLarge').get('span > svg').should('have.css', 'font-size', '35px');
    });
    it('placement test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkboxEnd'} label={'label text'} labelProps={{ labelPlacement: 'end' }} />
            </ComfortReactProvider>
        );
        cy.get('#checkboxEnd').get('label').should('have.class', 'MuiFormControlLabel-labelPlacementEnd');
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkboxBottom'} label={'label text'} labelProps={{ labelPlacement: 'bottom' }} />
            </ComfortReactProvider>
        );
        cy.get('#checkboxBottom').get('label').should('have.class', 'MuiFormControlLabel-labelPlacementBottom');
    });
    it('label test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Checkbox
                    id={'checkboxLabel'}
                    label={'label text'}
                    valueKey={'id'}
                    getOptionLabel={(option) => option.label}
                />
            </ComfortReactProvider>
        );
        cy.get('#checkboxLabel').get('label').contains('label text');
    });
    it('disabled test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkbox'} label={'label text'} value={true} />
            </ComfortReactProvider>
        );
        cy.get('#checkbox').get('span').should('have.css', 'color', 'rgb(25, 118, 210)');
        cy.get('#checkbox').get('span').should('have.css', 'cursor', 'pointer');
        cy.get('#checkbox').get('span').should('have.css', 'pointer-events', 'auto');
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkboxDisabled'} label={'label text'} disabled={true} value={true} />
            </ComfortReactProvider>
        );
        cy.get('#checkboxDisabled').get('span').should('have.css', 'color', 'rgba(0, 0, 0, 0.26)');
        cy.get('#checkboxDisabled').get('span').should('have.css', 'pointer-events', 'none');
        cy.get('#checkboxDisabled').get('span').should('have.css', 'cursor', 'default');
    });
    it('custom theme test', () => {
        const CUSTOM_THEME = {
            color: pink[800],
            '&.Mui-checked': {
                color: pink[600],
            },
        };
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkbox'} label={'label text'} />
            </ComfortReactProvider>
        );
        cy.get('#checkbox').get('span').should('have.css', 'color', 'rgba(0, 0, 0, 0.6)');
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkboxCustom'} label={'label text'} style={CUSTOM_THEME} />
            </ComfortReactProvider>
        );
        cy.get('#checkboxCustom').get('span').should('have.css', 'color', 'rgb(173, 20, 87)');
    });
    it('blur test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkbox'} label={'label text'} />
            </ComfortReactProvider>
        );
        cy.get('#checkbox').click();
        cy.get('body').click();
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkboxBlur'} label={'label text'} onBlur={handleBlur()} />
            </ComfortReactProvider>
        );
        cy.get('#checkboxBlur').click();
        cy.get('body').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('indeterminate test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkbox'} label={'label text'} value={true} />
            </ComfortReactProvider>
        );
        cy.get('#checkbox').get('span').should('have.class', 'Mui-checked');
        cy.mount(
            <ComfortReactProvider>
                <Checkbox id={'checkboxIndeterminate'} label={'label text'} value={true} indeterminate={true} />
            </ComfortReactProvider>
        );
        cy.get('#checkboxIndeterminate').get('span').should('have.class', 'MuiCheckbox-indeterminate');
    });
});
