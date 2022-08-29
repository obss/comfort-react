import { mount } from '@cypress/react';
import { TransferList } from '../../src/lib';
import { pink } from '@mui/material/colors';

describe('TransferList tests', () => {
    it('mount test', () => {
        mount(<TransferList options={options} />);
    });
    it('checkbox size test', () => {
        mount(<TransferList options={options} checkboxProps={{ size: 'medium' }} />);
        cy.get(':nth-child(1) > span > svg').should('have.css', 'font-size', '24px');
        mount(<TransferList options={options} checkboxProps={{ size: 'large' }} />);
        cy.get(':nth-child(1) > span > svg').should('have.css', 'font-size', '35px');
    });
    it('checkbox style test', () => {
        const CUSTOM_CHECKBOX_THEME = {
            color: pink[800],
            '&.Mui-checked': {
                color: pink[600],
            },
        };
        mount(<TransferList options={options} />);
        cy.get(':nth-child(1) > span > svg').should('have.css', 'color', 'rgba(0, 0, 0, 0.6)');
        mount(<TransferList options={options} checkboxProps={{ sx: CUSTOM_CHECKBOX_THEME }} />);
        cy.get(':nth-child(1) > span > svg').should('have.css', 'color', 'rgb(173, 20, 87)');
    });
    it('disable test', () => {
        mount(<TransferList options={options} disabled={false} />);
        cy.get(':nth-child(2) > .MuiGrid-root > :nth-child(1)').should('not.be.disabled');
        mount(<TransferList options={options} disabled={true} />);
        cy.get(':nth-child(2) > .MuiGrid-root > :nth-child(1)').should('be.disabled');
    });
    it('sort alphabetically test', () => {
        mount(<TransferList options={options} sortAlphabetically={false} />);
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Asia');
        mount(<TransferList options={options} sortAlphabetically={true} />);
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Africa');
    });
    it('label test', () => {
        mount(<TransferList options={complexOptions} valueKey={'id'} getOptionLabel={(option) => option.label} />);
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('Asia');
        mount(<TransferList options={complexOptions} valueKey={'id'} getOptionLabel={(option) => option.id} />);
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiList-root > :nth-child(1)').contains('1');
    });
    it('button style', () => {
        const CUSTOM_BUTTON_THEME = {
            borderRadius: 35,
            backgroundColor: '#21b6ae',
        };
        mount(<TransferList options={options} />);
        cy.get('.MuiGrid-root > [tabindex="0"]').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        mount(<TransferList options={options} buttonStyleProps={CUSTOM_BUTTON_THEME} />);
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
