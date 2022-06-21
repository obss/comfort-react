import { mount } from '@cypress/react';
import { Autocomplete } from '../../src/lib';

describe('Autocomplete tests', () => {
    it('mount test', () => {
        mount(<Autocomplete id={'autoComplete'} options={options} />);
        cy.get('#autoComplete').should('be.visible');
    });
    it('disabled test', () => {
        mount(<Autocomplete id={'autoComplete'} options={options} disabled={false} />);
        cy.get('#autoComplete').should('not.be.disabled');
        mount(<Autocomplete id={'autoCompleteDisabled'} options={options} disabled={true} />);
        cy.get('#autoCompleteDisabled').should('be.disabled');
    });
    it('blurred test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        mount(<Autocomplete id={'autoComplete'} options={options} />);
        cy.get('#autoComplete').focus().blur();
        mount(<Autocomplete id={'autoCompleteBlur'} options={options} onBlur={handleBlur} />);
        cy.get('#autoCompleteBlur').focus().blur();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('sort alphabetically test', () => {
        mount(<Autocomplete id={'autoComplete'} options={options} onChange={() => null} />);
        cy.get('#autoComplete').click().get('.MuiAutocomplete-popper li[data-option-index="0"]').contains('Asia');
        mount(
            <Autocomplete id={'autoCompleteSorted'} options={options} onChange={() => null} sortAlphabetically={true} />
        );
        cy.get('#autoCompleteSorted')
            .click()
            .get('.MuiAutocomplete-popper li[data-option-index="0"]')
            .contains('Africa');
    });
    it('onclose test', () => {
        const handleClose = () => {
            alert('closed');
        };
        mount(<Autocomplete id={'autoComplete'} options={options} />);
        cy.get('#autoComplete').click();
        cy.get('body').click();
        mount(<Autocomplete id={'autoCompleteClose'} options={options} onClose={handleClose} />);
        cy.get('#autoCompleteClose').click();
        cy.get('body').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('closed');
        });
    });
    it('loading test', () => {
        mount(<Autocomplete id={'autoComplete'} options={options} loading={false} />);
        cy.get('#autoComplete').type('meaningless search').get('.MuiAutocomplete-noOptions');
        mount(<Autocomplete id={'autoCompleteLoading'} options={options} loading={true} />);
        cy.get('#autoCompleteLoading').type('another meaningless search').get('.MuiAutocomplete-loading');
    });
    it('disable clearable test', () => {
        mount(<Autocomplete id={'autoCompleteClearable'} options={options} disableClearable={false} value={'value'} />);
        cy.get('#autoCompleteClearable').click().get('div > button').first().should('have.attr', 'aria-label', 'Clear');
        mount(
            <Autocomplete
                id={'autoCompleteDisabledClearable'}
                options={options}
                disableClearable={true}
                value={'value'}
            />
        );
        cy.get('#autoCompleteDisabledClearable')
            .click()
            .get('div > button')
            .first()
            .should('have.attr', 'aria-label', 'Close');
    });
    it('placeholder test', () => {
        mount(<Autocomplete id={'autoComplete'} options={options} />);
        cy.get('#autoComplete').click().should('not.have.attr', 'placeholder');
        mount(<Autocomplete id={'autoCompletePlaceholder'} options={options} placeholder={'placeholder text'} />);
        cy.get('#autoCompletePlaceholder').click().invoke('attr', 'placeholder').should('contain', 'placeholder text');
    });
    it('label test', () => {
        mount(
            <Autocomplete
                id={'autoCompleteLabel'}
                options={complexOptions}
                valueKey={'id'}
                getOptionLabel={(option) => {
                    return option.label;
                }}
            />
        );
        cy.get('#autoCompleteLabel').click().get('.MuiAutocomplete-popper li[data-option-index="0"]').contains('Asia');
        mount(
            <Autocomplete
                id={'autoCompleteId'}
                valueKey={'id'}
                options={complexOptions}
                getOptionLabel={(option) => option.id}
            />
        );
        cy.get('#autoCompleteId').click().get('.MuiAutocomplete-popper li[data-option-index="0"]').contains('1');
    });
    it('fullwidth test', () => {
        mount(<Autocomplete id={'autoComplete'} options={options} fullWidth={false} />);
        cy.get('.MuiAutocomplete-root').should('not.have.class', 'MuiAutocomplete-fullWidth');
        mount(<Autocomplete id={'autoCompleteFullwidth'} options={options} fullWidth={true} />);
        cy.get('.MuiAutocomplete-root').should('have.class', 'MuiAutocomplete-fullWidth');
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
