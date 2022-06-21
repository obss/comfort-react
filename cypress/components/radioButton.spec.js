import { mount } from '@cypress/react';
import { RadioButton } from '../../src/lib';
import { pink } from '@mui/material/colors';

describe('RadioButton tests', () => {
    it('mount test', () => {
        mount(<RadioButton id={'radioButton'} label={'label text'} options={options} />);
        cy.get('#radioButton').should('be.visible');
    });
    it('size test', () => {
        mount(<RadioButton id={'radioButton'} label={'label text'} options={options} />);
        cy.get('#radioButton')
            .get(':nth-child(1) > .MuiRadio-root > .PrivateSwitchBase-input')
            .get('span > svg')
            .should('have.class', 'MuiSvgIcon-fontSizeMedium');
        mount(
            <RadioButton
                id={'radioButtonLarge'}
                label={'label text'}
                options={options}
                radioProps={{ size: 'large' }}
            />
        );
        cy.get('#radioButtonLarge')
            .get(':nth-child(1) > .MuiRadio-root > .PrivateSwitchBase-input')
            .get('span > svg')
            .should('have.class', 'MuiSvgIcon-fontSizeLarge');
    });
    it('placement test', () => {
        mount(
            <RadioButton
                id={'radioButtonEnd'}
                label={'label text'}
                options={options}
                labelProps={{ labelPlacement: 'end' }}
            />
        );
        cy.get('#radioButtonEnd')
            .get('.MuiFormGroup-root > :nth-child(1)')
            .should('have.class', 'MuiFormControlLabel-labelPlacementEnd');
        mount(
            <RadioButton
                id={'radioButtonBottom'}
                label={'label text'}
                options={options}
                labelProps={{ labelPlacement: 'bottom' }}
            />
        );
        cy.get('#radioButtonBottom')
            .get('.MuiFormGroup-root > :nth-child(1)')
            .should('have.class', 'MuiFormControlLabel-labelPlacementBottom');
    });
    it('label test', () => {
        mount(
            <RadioButton
                id={'radioButtonLabel'}
                label={'label text'}
                options={complexOptions}
                valueKey={'id'}
                getOptionLabel={(option) => option.label}
            />
        );
        cy.get('#radioButtonLabel').get('.MuiFormGroup-root > :nth-child(1)').contains('Asia');
        mount(
            <RadioButton
                id={'radioButtonId'}
                label={'label text'}
                options={complexOptions}
                valueKey={'id'}
                getOptionLabel={(option) => option.id}
            />
        );
        cy.get('#radioButtonId').get('.MuiFormGroup-root > :nth-child(1)').contains('1');
    });
    it('disabled test', () => {
        mount(<RadioButton id={'radioButton'} label={'label text'} options={options} />);
        cy.get('#radioButton').get('.MuiFormGroup-root > :nth-child(1)').should('not.have.class', 'Mui-disabled');
        cy.get('#radioButton').get('.MuiFormGroup-root > :nth-child(1)').should('not.have.css', 'cursor', 'default');
        mount(<RadioButton id={'radioButtonDisabled'} label={'label text'} options={options} disabled={true} />);
        cy.get('#radioButtonDisabled').get('.MuiFormGroup-root > :nth-child(1)').should('have.class', 'Mui-disabled');
        cy.get('#radioButtonDisabled')
            .get('.MuiFormGroup-root > :nth-child(1)')
            .should('have.css', 'cursor', 'default');
    });
    it('row test', () => {
        mount(<RadioButton id={'radioButton'} label={'label text'} options={options} />);
        cy.get('#radioButton').get('.MuiFormGroup-root').should('not.have.class', 'MuiFormGroup-row');
        mount(<RadioButton id={'radioButtonRow'} label={'label text'} options={options} row={true} />);
        cy.get('#radioButtonRow').get('.MuiFormGroup-root').should('have.class', 'MuiFormGroup-row');
    });
    it('custom theme test', () => {
        const CUSTOM_THEME = {
            color: pink[800],
            '&.Mui-checked': {
                color: pink[600],
            },
        };
        mount(<RadioButton id={'radioButton'} label={'label text'} options={options} />);
        cy.get('#radioButton')
            .get(':nth-child(1) > .MuiRadio-root > span')
            .should('have.css', 'color', 'rgba(0, 0, 0, 0.6)');
        mount(
            <RadioButton
                id={'radioButtonCustom'}
                label={'label text'}
                options={options}
                radioProps={{ sx: CUSTOM_THEME }}
            />
        );
        cy.get('#radioButtonCustom')
            .get(':nth-child(1) > .MuiRadio-root > span')
            .should('have.css', 'color', 'rgb(173, 20, 87)');
    });
    it('sort alphabetic test', () => {
        mount(<RadioButton id={'radioButton'} label={'label text'} options={options} />);
        cy.get('#radioButton').get('.MuiFormGroup-root > :nth-child(1)').contains('Asia');
        mount(
            <RadioButton
                id={'radioButtonLabelSorted'}
                label={'label text'}
                options={options}
                sortAlphabetically={true}
            />
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
