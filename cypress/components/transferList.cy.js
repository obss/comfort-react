import { pink } from '@mui/material/colors';
import { ComfortReactProvider, TransferList } from '../../src/lib';

describe('TransferList tests', () => {
    it('mount test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={options} />
            </ComfortReactProvider>
        );
    });
    it('checkbox size test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={options} checkboxProps={{ size: 'medium' }} />
            </ComfortReactProvider>
        );
        cy.get(':nth-child(1) > span > svg').should('have.css', 'font-size', '24px');
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={options} checkboxProps={{ size: 'large' }} />
            </ComfortReactProvider>
        );
        cy.get(':nth-child(1) > span > svg').should('have.css', 'font-size', '35px');
    });
    it('checkbox style test', () => {
        const CUSTOM_CHECKBOX_THEME = {
            color: pink[800],
            '&.Mui-checked': {
                color: pink[600],
            },
        };
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={options} />
            </ComfortReactProvider>
        );
        cy.get(':nth-child(1) > span > svg').should('have.css', 'color', 'rgba(0, 0, 0, 0.6)');
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={options} checkboxProps={{ sx: CUSTOM_CHECKBOX_THEME }} />
            </ComfortReactProvider>
        );
        cy.get(':nth-child(1) > span > svg').should('have.css', 'color', 'rgb(173, 20, 87)');
    });
    it('disable test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={options} disabled={false} />
            </ComfortReactProvider>
        );
        cy.get(':nth-child(2) > .MuiGrid-root > :nth-child(1)').should('not.be.disabled');
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={options} disabled={true} />
            </ComfortReactProvider>
        );
        cy.get(':nth-child(2) > .MuiGrid-root > :nth-child(1)').should('be.disabled');
    });
    it('sort alphabetically test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={options} sortAlphabetically={false} />
            </ComfortReactProvider>
        );
        cy.get('.MuiList-root span:nth-child(1)').contains('Asia');
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={options} sortAlphabetically={true} />
            </ComfortReactProvider>
        );
        cy.get('.MuiList-root span:nth-child(1)').contains('Africa');
    });
    it('label test', () => {
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={complexOptions} valueKey={'id'} getOptionLabel={(option) => option.label} />
            </ComfortReactProvider>
        );
        cy.get('.MuiList-root span:nth-child(1)').contains('Asia');
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={complexOptions} valueKey={'id'} getOptionLabel={(option) => option.id} />
            </ComfortReactProvider>
        );
        cy.get('.MuiList-root span:nth-child(1)').contains('1');
    });
    it('button style', () => {
        const CUSTOM_BUTTON_THEME = {
            borderRadius: 35,
            backgroundColor: '#21b6ae',
        };
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={options} />
            </ComfortReactProvider>
        );
        cy.get('.MuiGrid-root > [tabindex="0"]').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.mount(
            <ComfortReactProvider>
                <TransferList options={options} buttonStyleProps={CUSTOM_BUTTON_THEME} />
            </ComfortReactProvider>
        );
        cy.get('.MuiGrid-root > [tabindex="0"]').should('have.css', 'background-color', 'rgb(33, 182, 174)');
    });
});

export const options = ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Australia', 'Antarctica'];

export const complexOptions = [
    { id: 1, label: 'Asia', description: 'this is Asia' },
    { id: 2, label: 'Europe', description: 'this is Europe' },
    { id: 3, label: 'North America', description: 'this is North America' },
    { id: 4, label: 'South America', description: 'this is South America' },
    { id: 5, label: 'Africa', description: 'this is Africa' },
    { id: 6, label: 'Australia', description: 'this is Australia' },
    { id: 7, label: 'Antarctica', description: 'this is Antarctica' },
];
