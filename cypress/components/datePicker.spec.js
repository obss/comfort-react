import { mount, mountHook } from '@cypress/react';
import { ComfortReactProvider, DatePicker } from "../../src/lib";
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from 'react';

describe('DatePicker tests', () => {
    it('mount test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiOutlinedInput-root').should('be.visible');
    });
    it('disabled test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker disabled={false} />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiOutlinedInput-root > input').should('not.be.disabled');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker disabled={true} />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiOutlinedInput-root > input').should('be.disabled');
    });
    it('style test', () => {
        const INPUT_STYLE = { color: 'red' };
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiOutlinedInput-root > input').should('have.css', 'color', 'rgba(0, 0, 0, 0.87)');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker InputProps={{ style: INPUT_STYLE }} />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiOutlinedInput-root > input').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
    it('blur test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker onChange={() => null} />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiOutlinedInput-root > input').focus().blur();
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker onBlur={handleBlur} onChange={() => null} />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiOutlinedInput-root > input').focus().blur();
    });
    it('placeholder test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker onChange={() => null} />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiOutlinedInput-root > input').click().should('not.have.attr', 'placeholder');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker onChange={() => null} placeholder={'placeholder text'} />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiOutlinedInput-root > input')
            .click()
            .invoke('attr', 'placeholder')
            .should('contain', 'placeholder text');
    });
    it('variant test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker variant={'outlined'} />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiOutlinedInput-root > input').should('have.css', 'padding-bottom', '16.5px');
        cy.get('.MuiOutlinedInput-root > input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('.MuiOutlinedInput-root > input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('.MuiOutlinedInput-root > input').should('have.class', 'MuiOutlinedInput-input');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker variant={'filled'} />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiFilledInput-root > input').should('have.css', 'padding-bottom', '8px');
        cy.get('.MuiFilledInput-root > input').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)');
        cy.get('.MuiFilledInput-root > input').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        cy.get('.MuiFilledInput-root > input').should('have.class', 'MuiFilledInput-input');
    });
    it('date picker test', () => {
        let value = new Date('08/08/2023');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker variant={'outlined'} value={value} onChange={(newValue) => (value = newValue)} />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiButtonBase-root').click().get('.css-l0iinn > .MuiButtonBase-root').click();
        cy.get('.MuiYearPicker-root > :nth-child(123)').click();
        cy.get('.MuiButtonBase-root').contains('23').click();
        console.log(value);
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'datePicker'}>
                <ComfortReactProvider>
                    <DatePicker variant={'outlined'} value={value} onChange={(newValue) => (value = newValue)} />
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiOutlinedInput-root > input').should('have.value', '23/08/2022');
    });
});
