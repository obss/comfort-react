import { mount } from '@cypress/react';
import { ComfortReactProvider, FileInput } from '../../src/lib';
import { SnackbarProvider } from 'notistack';

describe('FileInput Tests', () => {
    it('mount test', () => {
        mount(
            <SnackbarProvider>
                <ComfortReactProvider>
                    <FileInput id={'dropzone'} />
                </ComfortReactProvider>
            </SnackbarProvider>
        );
        cy.get('#dropzone').should('exist');
    });
    it('drop test', () => {
        const handleDrop = (files) => {
            expect(files).length(1);
        };
        mount(
            <SnackbarProvider>
                <ComfortReactProvider>
                    <FileInput id={'dropzone'} onChange={handleDrop} setValue={() => null} />
                </ComfortReactProvider>
            </SnackbarProvider>
        );
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzone').upload(content, 'sample-image.jpeg');
        });
    });
    it('accept test', () => {
        const handleDropVideo = (files) => {
            expect(files).length(0);
        };
        const handleDropImage = (files) => {
            expect(files).length(1);
        };
        mount(
            <SnackbarProvider>
                <ComfortReactProvider>
                    <FileInput id={'dropzone'} onChange={handleDropVideo} accept={'video/*'} setValue={() => null} />
                </ComfortReactProvider>
            </SnackbarProvider>
        );
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzone').upload(content, 'sample-image.jpeg');
        });
        mount(
            <SnackbarProvider>
                <ComfortReactProvider>
                    <FileInput id={'dropzone'} onChange={handleDropImage} accept={'image/*'} setValue={() => null} />
                </ComfortReactProvider>
            </SnackbarProvider>
        );
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzone').upload(content, 'sample-image.jpeg');
        });
    });
    it('custom description test', () => {
        mount(
            <SnackbarProvider>
                <ComfortReactProvider>
                    <FileInput id={'dropzone'} />
                </ComfortReactProvider>
            </SnackbarProvider>
        );
        cy.get('#dropzone').contains('Dosyaları buraya sürükleyip bırakın veya dosyaları seçmek için tıklayın');
        mount(
            <SnackbarProvider>
                <ComfortReactProvider>
                    <FileInput id={'dropzone'} description={'Custom Description'} />
                </ComfortReactProvider>
            </SnackbarProvider>
        );
        cy.get('#dropzone').contains('Custom Description');
    });
    it('disabled test', () => {
        const handleDrop = (files) => {
            expect(files).length(1);
        };
        mount(
            <SnackbarProvider>
                <ComfortReactProvider>
                    <FileInput id={'dropzone'} onChange={handleDrop} setValue={() => null} disabled={false} />
                </ComfortReactProvider>
            </SnackbarProvider>
        );
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzone').upload(content, 'sample-image.jpeg');
            cy.get('#dropzone .ComfortFileInputDropzoneSection__Disabled').should('not.exist');
        });
        mount(
            <SnackbarProvider>
                <ComfortReactProvider>
                    <FileInput id={'dropzoneDisabled'} onChange={handleDrop} setValue={() => null} disabled={true} />
                </ComfortReactProvider>
            </SnackbarProvider>
        );
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzoneDisabled').upload(content, 'sample-image.jpeg');
            cy.get('#dropzoneDisabled .ComfortFileInputDropzoneSection__Disabled').should('exist');
        });
    });
    it('upload item test', () => {
        const handleDrop = (files) => {
            expect(files).length(1);
        };
        mount(
            <SnackbarProvider>
                <ComfortReactProvider>
                    <FileInput id={'dropzone'} onChange={handleDrop} setValue={() => null} maxFiles={2} />
                </ComfortReactProvider>
            </SnackbarProvider>
        );
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzone').upload(content, 'sample-image.jpeg');
        });
    });
});
