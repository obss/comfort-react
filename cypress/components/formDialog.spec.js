import { mount } from '@cypress/react';
import { ComfortReactProvider, FormDialog, TextField } from '../../src/lib/index';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';

describe('FormDialog tests', () => {
    it('mount test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <FormDialog id={'dialog'} open={true}>
                        <TextField id={'textFieldDisabled'} />
                    </FormDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#dialog').should('be.visible');
    });
    it('open test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <FormDialog id={'dialog'} open={false}>
                        <TextField id={'textFieldDisabled'} />
                    </FormDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#dialog').should('not.exist');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <FormDialog id={'dialog'} open={true}>
                        <TextField id={'textFieldDisabled'} />
                    </FormDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#dialog').should('be.visible');
    });
    it('onClose test', () => {
        const handleClose = () => {
            alert('closed');
        };
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <FormDialog id={'dialog'} open={true} onClose={handleClose}>
                        <TextField id={'textFieldDisabled'} />
                    </FormDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('body').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('closed');
        });
    });
    it('fullScreen test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <FormDialog id={'dialog'} open={true} fullScreen={false}>
                        <TextField id={'textFieldDisabled'} />
                    </FormDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiPaper-root').should('not.have.class', 'MuiDialog-paperFullScreen');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <FormDialog id={'dialog'} open={true} fullScreen={true}>
                        <TextField id={'textFieldDisabled'} />
                    </FormDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiPaper-root').should('have.class', 'MuiDialog-paperFullScreen');
    });
    it('hide close button test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <FormDialog id={'dialog'} open={true} hideCloseButton={false}>
                        <TextField id={'textFieldDisabled'} />
                    </FormDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#dialog h2 .MuiButtonBase-root').should('exist');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <FormDialog id={'dialog'} open={true} hideCloseButton={true}>
                        <TextField id={'textFieldDisabled'} />
                    </FormDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#dialog h2 .MuiButtonBase-root').should('not.exist');
    });
    it('draggable test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <FormDialog id={'dialog'} open={true} draggable={false}>
                        <TextField id={'textFieldDisabled'} />
                    </FormDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#dialog h2').should('have.css', 'cursor', 'auto');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <FormDialog id={'dialog'} open={true} draggable={true}>
                        <TextField id={'textFieldDisabled'} />
                    </FormDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#dialog h2').should('have.css', 'cursor', 'move');
    });
    it('onCancel test', () => {
        const handleCancel = () => {
            alert('canceled');
        };
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <FormDialog id={'dialog'} open={true} onCancel={handleCancel}>
                        <TextField id={'textFieldDisabled'} />
                    </FormDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiDialogActions-root .MuiButton-outlinedSizeMedium').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('canceled');
        });
    });
    it('onSave test', () => {
        const handleSave = () => {
            alert(`saved`);
        };
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <FormDialog id={'dialog'} open={true} onSave={handleSave}>
                        <TextField id={'textFieldDisabled'} />
                    </FormDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiDialogActions-root .MuiButton-containedSizeMedium').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('saved');
        });
    });
});
