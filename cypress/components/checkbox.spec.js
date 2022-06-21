import { mount } from '@cypress/react';
import { pink } from '@mui/material/colors';
import { Checkbox } from '../../src/lib';

describe('checkbox tests', () => {
    it('mount test', () => {
        mount(<Checkbox id={'checkbox'} label={'label text'} />);
        cy.get('#checkbox').should('be.visible');
    });
    it('size test', () => {
        mount(<Checkbox id={'checkbox'} label={'label text'} />);
        cy.get('#checkbox').get('span > svg').should('have.css', 'font-size', '24px');
        mount(<Checkbox id={'checkboxLarge'} label={'label text'} size={'large'} />);
        cy.get('#checkboxLarge').get('span > svg').should('have.css', 'font-size', '35px');
    });
    it('placement test', () => {
        mount(<Checkbox id={'checkboxEnd'} label={'label text'} labelProps={{ labelPlacement: 'end' }} />);
        cy.get('#checkboxEnd').get('label').should('have.class', 'MuiFormControlLabel-labelPlacementEnd');
        mount(<Checkbox id={'checkboxBottom'} label={'label text'} labelProps={{ labelPlacement: 'bottom' }} />);
        cy.get('#checkboxBottom').get('label').should('have.class', 'MuiFormControlLabel-labelPlacementBottom');
    });
    it('label test', () => {
        mount(
            <Checkbox
                id={'checkboxLabel'}
                label={'label text'}
                valueKey={'id'}
                getOptionLabel={(option) => option.label}
            />
        );
        cy.get('#checkboxLabel').get('label').contains('label text');
    });
    it('disabled test', () => {
        mount(<Checkbox id={'checkbox'} label={'label text'} value={true} />);
        cy.get('#checkbox').get('span').should('have.css', 'color', 'rgb(25, 118, 210)');
        cy.get('#checkbox').get('span').should('have.css', 'cursor', 'pointer');
        cy.get('#checkbox').get('span').should('have.css', 'pointer-events', 'auto');
        mount(<Checkbox id={'checkboxDisabled'} label={'label text'} disabled={true} value={true} />);
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
        mount(<Checkbox id={'checkbox'} label={'label text'} />);
        cy.get('#checkbox').get('span').should('have.css', 'color', 'rgba(0, 0, 0, 0.6)');
        mount(<Checkbox id={'checkboxCustom'} label={'label text'} style={CUSTOM_THEME} />);
        cy.get('#checkboxCustom').get('span').should('have.css', 'color', 'rgb(173, 20, 87)');
    });
    it('blur test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        mount(<Checkbox id={'checkbox'} label={'label text'} />);
        cy.get('#checkbox').click();
        cy.get('body').click();
        mount(<Checkbox id={'checkboxBlur'} label={'label text'} onBlur={handleBlur()} />);
        cy.get('#checkboxBlur').click();
        cy.get('body').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('indeterminate test', () => {
        mount(<Checkbox id={'checkbox'} label={'label text'} value={true} />);
        cy.get('#checkbox').get('span').should('have.class', 'Mui-checked');
        mount(<Checkbox id={'checkboxIndeterminate'} label={'label text'} value={true} indeterminate={true} />);
        cy.get('#checkboxIndeterminate').get('span').should('have.class', 'MuiCheckbox-indeterminate');
    });
});
