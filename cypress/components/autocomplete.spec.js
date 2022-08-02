import { mount } from '@cypress/react';
import { ComfortReactProvider, Autocomplete } from '../../src/lib';

describe('Autocomplete tests', () => {
    it('mount test', () => {
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoComplete'} options={options} />
            </ComfortReactProvider>
        );
        cy.get('#autoComplete').should('be.visible');
    });
    it('disabled test', () => {
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoComplete'} options={options} disabled={false} />
            </ComfortReactProvider>
        );
        cy.get('#autoComplete').should('not.be.disabled');
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoCompleteDisabled'} options={options} disabled={true} />
            </ComfortReactProvider>
        );
        cy.get('#autoCompleteDisabled').should('be.disabled');
    });
    it('blurred test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoComplete'} options={options} />
            </ComfortReactProvider>
        );
        cy.get('#autoComplete').focus().blur();
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoCompleteBlur'} options={options} onBlur={handleBlur} />
            </ComfortReactProvider>
        );
        cy.get('#autoCompleteBlur').focus().blur();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('sort alphabetically test', () => {
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoComplete'} options={options} onChange={() => null} />
            </ComfortReactProvider>
        );
        cy.get('#autoComplete').click().get('.MuiAutocomplete-popper li[data-option-index="0"]').contains('Asia');
        mount(
            <ComfortReactProvider>
                <Autocomplete
                    id={'autoCompleteSorted'}
                    options={options}
                    onChange={() => null}
                    sortAlphabetically={true}
                />
            </ComfortReactProvider>
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
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoComplete'} options={options} />
            </ComfortReactProvider>
        );
        cy.get('#autoComplete').click();
        cy.get('body').click();
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoCompleteClose'} options={options} onClose={handleClose} />
            </ComfortReactProvider>
        );
        cy.get('#autoCompleteClose').click();
        cy.get('body').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('closed');
        });
    });
    it('loading test', () => {
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoComplete'} options={options} loading={false} />
            </ComfortReactProvider>
        );
        cy.get('#autoComplete').type('meaningless search').get('.MuiAutocomplete-noOptions');
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoCompleteLoading'} options={options} loading={true} />
            </ComfortReactProvider>
        );
        cy.get('#autoCompleteLoading').type('another meaningless search').get('.MuiAutocomplete-loading');
    });
    it('disable clearable test', () => {
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoCompleteClearable'} options={options} disableClearable={false} value={'value'} />
            </ComfortReactProvider>
        );
        cy.get('#autoCompleteClearable').click().get('div > button').first().should('have.attr', 'aria-label', 'Clear');
        mount(
            <ComfortReactProvider>
                <Autocomplete
                    id={'autoCompleteDisabledClearable'}
                    options={options}
                    disableClearable={true}
                    value={'value'}
                />
            </ComfortReactProvider>
        );
        cy.get('#autoCompleteDisabledClearable')
            .click()
            .get('div > button')
            .first()
            .should('have.attr', 'aria-label', 'Close');
    });
    it('placeholder test', () => {
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoComplete'} options={options} />
            </ComfortReactProvider>
        );
        cy.get('#autoComplete').click().should('not.have.attr', 'placeholder');
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoCompletePlaceholder'} options={options} placeholder={'placeholder text'} />
            </ComfortReactProvider>
        );
        cy.get('#autoCompletePlaceholder').click().invoke('attr', 'placeholder').should('contain', 'placeholder text');
    });
    it('label test', () => {
        mount(
            <ComfortReactProvider>
                <Autocomplete
                    id={'autoCompleteLabel'}
                    options={complexOptions}
                    valueKey={'id'}
                    getOptionLabel={(option) => {
                        return option.label;
                    }}
                />
            </ComfortReactProvider>
        );
        cy.get('#autoCompleteLabel').click().get('.MuiAutocomplete-popper li[data-option-index="0"]').contains('Asia');
        mount(
            <ComfortReactProvider>
                <Autocomplete
                    id={'autoCompleteId'}
                    valueKey={'id'}
                    options={complexOptions}
                    getOptionLabel={(option) => option.id}
                />
            </ComfortReactProvider>
        );
        cy.get('#autoCompleteId').click().get('.MuiAutocomplete-popper li[data-option-index="0"]').contains('1');
    });
    it('fullwidth test', () => {
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoComplete'} options={options} fullWidth={false} />
            </ComfortReactProvider>
        );
        cy.get('.MuiAutocomplete-root').should('not.have.class', 'MuiAutocomplete-fullWidth');
        mount(
            <ComfortReactProvider>
                <Autocomplete id={'autoCompleteFullwidth'} options={options} fullWidth={true} />
            </ComfortReactProvider>
        );
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
