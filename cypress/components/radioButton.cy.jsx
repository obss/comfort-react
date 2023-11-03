import { ComfortReactProvider, RadioButton } from '../../src/lib';
import { pink } from '@mui/material/colors';

describe('RadioButton tests', () => {
    it('mount test', () => {
        cy.mount(
            <ComfortReactProvider>
                <RadioButton id={'radioButton'} label={'label text'} options={options} />
            </ComfortReactProvider>
        );
        cy.get('#radioButton').should('be.visible');
    });
    it('size test', () => {
        cy.mount(
            <ComfortReactProvider>
                <RadioButton id={'radioButton'} label={'label text'} options={options} />
            </ComfortReactProvider>
        );
        cy.get('#radioButton')
            .get(':nth-child(1) > .MuiRadio-root > .PrivateSwitchBase-input')
            .get('span > svg')
            .should('have.class', 'MuiSvgIcon-fontSizeMedium');
        cy.mount(
            <ComfortReactProvider>
                <RadioButton
                    id={'radioButtonLarge'}
                    label={'label text'}
                    options={options}
                    radioProps={{ size: 'large' }}
                />
            </ComfortReactProvider>
        );
        cy.get('#radioButtonLarge')
            .get(':nth-child(1) > .MuiRadio-root > .PrivateSwitchBase-input')
            .get('span > svg')
            .should('have.class', 'MuiSvgIcon-fontSizeLarge');
    });
    it('placement test', () => {
        cy.mount(
            <ComfortReactProvider>
                <RadioButton
                    id={'radioButtonEnd'}
                    label={'label text'}
                    options={options}
                    labelProps={{ labelPlacement: 'end' }}
                />
            </ComfortReactProvider>
        );
        cy.get('#radioButtonEnd')
            .get('.MuiFormGroup-root > :nth-child(1)')
            .should('have.class', 'MuiFormControlLabel-labelPlacementEnd');
        cy.mount(
            <ComfortReactProvider>
                <RadioButton
                    id={'radioButtonBottom'}
                    label={'label text'}
                    options={options}
                    labelProps={{ labelPlacement: 'bottom' }}
                />
            </ComfortReactProvider>
        );
        cy.get('#radioButtonBottom')
            .get('.MuiFormGroup-root > :nth-child(1)')
            .should('have.class', 'MuiFormControlLabel-labelPlacementBottom');
    });
    it('label test', () => {
        cy.mount(
            <ComfortReactProvider>
                <RadioButton
                    id={'radioButtonLabel'}
                    label={'label text'}
                    options={complexOptions}
                    valueKey={'id'}
                    getOptionLabel={(option) => option.label}
                />
            </ComfortReactProvider>
        );
        cy.get('#radioButtonLabel').get('.MuiFormGroup-root > :nth-child(1)').contains('Asia');
        cy.mount(
            <ComfortReactProvider>
                <RadioButton
                    id={'radioButtonId'}
                    label={'label text'}
                    options={complexOptions}
                    valueKey={'id'}
                    getOptionLabel={(option) => option.id}
                />
            </ComfortReactProvider>
        );
        cy.get('#radioButtonId').get('.MuiFormGroup-root > :nth-child(1)').contains('1');
    });
    it('disabled test', () => {
        cy.mount(
            <ComfortReactProvider>
                <RadioButton id={'radioButton'} label={'label text'} options={options} />
            </ComfortReactProvider>
        );
        cy.get('#radioButton').get('.MuiFormGroup-root > :nth-child(1)').should('not.have.class', 'Mui-disabled');
        cy.get('#radioButton').get('.MuiFormGroup-root > :nth-child(1)').should('not.have.css', 'cursor', 'default');
        cy.mount(
            <ComfortReactProvider>
                <RadioButton id={'radioButtonDisabled'} label={'label text'} options={options} disabled={true} />
            </ComfortReactProvider>
        );
        cy.get('#radioButtonDisabled').get('.MuiFormGroup-root > :nth-child(1)').should('have.class', 'Mui-disabled');
        cy.get('#radioButtonDisabled')
            .get('.MuiFormGroup-root > :nth-child(1)')
            .should('have.css', 'cursor', 'default');
    });
    it('row test', () => {
        cy.mount(
            <ComfortReactProvider>
                <RadioButton id={'radioButton'} label={'label text'} options={options} />
            </ComfortReactProvider>
        );
        cy.get('#radioButton').get('.MuiFormGroup-root').should('not.have.class', 'MuiFormGroup-row');
        cy.mount(
            <ComfortReactProvider>
                <RadioButton id={'radioButtonRow'} label={'label text'} options={options} row={true} />
            </ComfortReactProvider>
        );
        cy.get('#radioButtonRow').get('.MuiFormGroup-root').should('have.class', 'MuiFormGroup-row');
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
                <RadioButton id={'radioButton'} label={'label text'} options={options} />
            </ComfortReactProvider>
        );
        cy.get('#radioButton')
            .get(':nth-child(1) > .MuiRadio-root > span')
            .should('have.css', 'color', 'rgba(0, 0, 0, 0.6)');
        cy.mount(
            <ComfortReactProvider>
                <RadioButton
                    id={'radioButtonCustom'}
                    label={'label text'}
                    options={options}
                    radioProps={{ sx: CUSTOM_THEME }}
                />
            </ComfortReactProvider>
        );
        cy.get('#radioButtonCustom')
            .get(':nth-child(1) > .MuiRadio-root > span')
            .should('have.css', 'color', 'rgb(173, 20, 87)');
    });
    it('sort alphabetic test', () => {
        cy.mount(
            <ComfortReactProvider>
                <RadioButton id={'radioButton'} label={'label text'} options={options} />
            </ComfortReactProvider>
        );
        cy.get('#radioButton').get('.MuiFormGroup-root > :nth-child(1)').contains('Asia');
        cy.mount(
            <ComfortReactProvider>
                <RadioButton
                    id={'radioButtonLabelSorted'}
                    label={'label text'}
                    options={options}
                    sortAlphabetically={true}
                />
            </ComfortReactProvider>
        );
        cy.get('#radioButtonLabelSorted').get('.MuiFormGroup-root > :nth-child(1)').contains('Africa');
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
