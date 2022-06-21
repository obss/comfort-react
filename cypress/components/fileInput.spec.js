import { mount } from '@cypress/react';
import { FileInput, Button } from '../../src/lib';

describe('FileInput Tests', () => {
    it('mount test', () => {
        mount(<FileInput id={'dropzone'} />);
        cy.get('#dropzone').should('exist');
    });
    it('drop test', () => {
        const handleDrop = (files) => {
            expect(files).length(1);
        };
        mount(<FileInput id={'dropzone'} onDrop={handleDrop} setValue={() => null} />);
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
        mount(<FileInput id={'dropzone'} onDrop={handleDropVideo} accept={'video/*'} setValue={() => null} />);
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzone').upload(content, 'sample-image.jpeg');
        });
        mount(<FileInput id={'dropzone'} onDrop={handleDropImage} accept={'image/*'} setValue={() => null} />);
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzone').upload(content, 'sample-image.jpeg');
        });
    });
    it('custom description test', () => {
        mount(<FileInput id={'dropzone'} />);
        cy.get('#dropzone').contains('Drag and drop some files here, or click to select files');
        mount(<FileInput id={'dropzone'} description={'Custom Description'} />);
        cy.get('#dropzone').contains('Custom Description');
    });
    it('button operations test', () => {
        mount(<FileInput id={'dropzone'} />);
        cy.get('#dropzone button').should('not.exist');
        mount(<FileInput id={'dropzone'} buttonOperations={<Button> Operation Button </Button>} />);
        cy.get('#dropzone button').should('exist');
    });
    it('disabled test', () => {
        const handleDrop = (files) => {
            expect(files).length(1);
        };
        mount(<FileInput id={'dropzone'} onDrop={handleDrop} setValue={() => null} disabled={false} />);
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzone').upload(content, 'sample-image.jpeg');
            cy.get('#dropzone button').should('exist');
        });
        mount(<FileInput id={'dropzoneDisabled'} onDrop={handleDrop} setValue={() => null} disabled={true} />);
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzoneDisabled').upload(content, 'sample-image.jpeg');
            cy.get('#dropzone button').should('not.exist');
        });
    });
    it('preview test', () => {
        const handleDrop = (files) => {
            expect(files).length(1);
        };
        mount(<FileInput id={'dropzone'} onDrop={handleDrop} setValue={() => null} />);
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzone').upload(content, 'sample-image.jpeg');
            cy.get('.MuiListItem-root > .MuiPaper-root').should('not.exist');
        });
        mount(<FileInput id={'dropzone'} onDrop={handleDrop} setValue={() => null} />);
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzone').upload(content, 'sample-image.jpeg');
            cy.get('.MuiSwitch-input').click();
            cy.get('.MuiListItem-root > .MuiPaper-root').should('exist');
        });
    });
    it('remove item test', () => {
        const handleDrop = (files) => {
            expect(files).length(1);
        };
        mount(<FileInput id={'dropzone'} onDrop={handleDrop} setValue={() => null} />);
        cy.fixture('../support/files/sample-image.jpeg', 'base64').then((content) => {
            cy.get('#dropzone').upload(content, 'sample-image.jpeg');
            cy.get('#dropzone button').should('exist');
            cy.get('#dropzone button').click();
            cy.get('#dropzone button').should('not.exist');
        });
    });
});
