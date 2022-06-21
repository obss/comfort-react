import { mount } from '@cypress/react';
import { ShrinkableTransferList } from '../../src/lib';

describe('Shrinkable Transfer List Tests', () => {
    it('mount test', () => {
        cy.viewport(1025, 1000);
        mount(<ShrinkableTransferList id={'shrinkableTransferList'} options={options} checkBoxProps={{ size: 'medium' }} />);
        cy.get('#shrinkableTransferList').should('exist');
    });
    it('changeable test', () => {
        cy.viewport(1025, 1000);
        mount(<ShrinkableTransferList id={'shrinkableTransferList'} options={options} checkBoxProps={{ size: 'medium' }} />);
        cy.get('#shrinkableTransferList').should('exist');
        cy.get('.ComfortAutocomplete').should('not.exist');
        cy.viewport(1023, 1000);
        mount(<ShrinkableTransferList id={'shrinkableTransferList'} options={options} checkBoxProps={{ size: 'medium' }} />);
        cy.get('.ComfortAutocomplete').should('exist');
        cy.get('.ComfortAutocomplete #shrinkableTransferList').should('exist');
    });
});

export const options = ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Australia', 'Antarctica'];
