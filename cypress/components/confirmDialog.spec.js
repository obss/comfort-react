import { mount } from '@cypress/react';
import { ComfortReactProvider, ConfirmDialog } from '../../src/lib/index';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';

describe('ConfirmDialog tests', () => {
    it('mount test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'confirmDialogProvider'}>
                <ComfortReactProvider>
                    <ConfirmDialog id={'confirmDialog'} open={true}>
                        Test
                    </ConfirmDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#confirmDialog').should('be.visible');
    });
    it('open test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'confirmDialogProvider'}>
                <ComfortReactProvider>
                    <ConfirmDialog id={'confirmDialog'} open={false}>
                        Test
                    </ConfirmDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#confirmDialog').should('not.exist');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'confirmDialogProvider'}>
                <ComfortReactProvider>
                    <ConfirmDialog id={'confirmDialog'} open={true}>
                        Test
                    </ConfirmDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#confirmDialog').should('be.visible');
    });
    it('onClose test', () => {
        const handleClose = () => {
            alert('closed');
        };
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'confirmDialogProvider'}>
                <ComfortReactProvider>
                    <ConfirmDialog id={'confirmDialog'} open={true} onClose={handleClose}>
                        Test
                    </ConfirmDialog>
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
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'confirmDialogProvider'}>
                <ComfortReactProvider>
                    <ConfirmDialog id={'confirmDialog'} open={true} fullScreen={false}>
                        Test
                    </ConfirmDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiPaper-root').should('not.have.class', 'MuiDialog-paperFullScreen');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'confirmDialogProvider'}>
                <ComfortReactProvider>
                    <ConfirmDialog id={'confirmDialog'} open={true} fullScreen={true}>
                        Test
                    </ConfirmDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiPaper-root').should('have.class', 'MuiDialog-paperFullScreen');
    });
    it('hide close button test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'confirmDialogProvider'}>
                <ComfortReactProvider>
                    <ConfirmDialog id={'confirmDialog'} open={true} hideCloseButton={false}>
                        Test
                    </ConfirmDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#confirmDialog h2 .MuiButtonBase-root').should('exist');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'confirmDialogProvider'}>
                <ComfortReactProvider>
                    <ConfirmDialog id={'confirmDialog'} open={true} hideCloseButton={true}>
                        Test
                    </ConfirmDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#confirmDialog h2 .MuiButtonBase-root').should('not.exist');
    });
    it('draggable test', () => {
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'confirmDialogProvider'}>
                <ComfortReactProvider>
                    <ConfirmDialog id={'confirmDialog'} open={true} draggable={false}>
                        Test
                    </ConfirmDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#confirmDialog h2').should('have.css', 'cursor', 'auto');
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'confirmDialogProvider'}>
                <ComfortReactProvider>
                    <ConfirmDialog id={'confirmDialog'} open={true} draggable={true}>
                        Test
                    </ConfirmDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('#confirmDialog h2').should('have.css', 'cursor', 'move');
    });
    it('onCancel test', () => {
        const handleCancel = () => {
            alert('canceled');
        };
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <ConfirmDialog id={'confirmDialog'} open={true} onCancel={handleCancel}>
                        Test
                    </ConfirmDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiDialogActions-root .MuiButton-outlinedSizeMedium').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('canceled');
        });
    });
    it('onSave test', () => {
        const handleConfirm = () => {
            alert(`confirmed`);
        };
        mount(
            <LocalizationProvider dateAdapter={AdapterDateFns} id={'formDialog'}>
                <ComfortReactProvider>
                    <ConfirmDialog id={'confirmDialog'} open={true} onConfirm={handleConfirm}>
                        Test
                    </ConfirmDialog>
                </ComfortReactProvider>
            </LocalizationProvider>
        );
        cy.get('.MuiDialogActions-root .MuiButton-containedSizeMedium').click();
        cy.on('window:alert', (text) => {
            expect(text).to.equal('confirmed');
        });
    });
});
