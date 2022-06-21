import { mount } from '@cypress/react';
import { Dialog } from '../../src/lib/index';

describe('Dialog tests', () => {
    it('mount test', () => {
        mount(<Dialog id={'dialog'} open={true}> Test </Dialog>);
        cy.get('#dialog').should('be.visible');
    });
    it('open test', () => {
      mount(<Dialog id={'dialog'} open={false}> Test </Dialog>);
      cy.get('#dialog').should('not.exist');
      mount(<Dialog id={'dialog'} open={true}> Test </Dialog>);
      cy.get('#dialog').should('be.visible');
    });
    it('onClose test', () => {
      const handleClose = () => {
        alert('closed');
      };
      mount(<Dialog id={'dialog'} open={true} onClose={handleClose}> Test </Dialog>);
      cy.get('body').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('closed');
      });
    });
    it('fullScreen test', () => {
      mount(<Dialog id={'dialog'} open={true} fullScreen={false}> Test </Dialog>);
      cy.get('.MuiPaper-root').should('not.have.class', 'MuiDialog-paperFullScreen');
      mount(<Dialog id={'dialog'} open={true} fullScreen={true}> Test </Dialog>);
      cy.get('.MuiPaper-root').should('have.class', 'MuiDialog-paperFullScreen');
    });
    it('hide close button test', () => {
      mount(<Dialog id={'dialog'} open={true} hideCloseButton={false}> Test </Dialog>);
      cy.get('.MuiButtonBase-root').should('exist');
      mount(<Dialog id={'dialog'} open={true} hideCloseButton={true}> Test </Dialog>)
      cy.get('.MuiButtonBase-root').should('not.exist');
    });
    it('draggable test', () => {
      mount(<Dialog id={'dialog'} open={true} draggable={false}> Test </Dialog>)
      cy.get('#dialog h2').should('have.css', 'cursor', 'auto');
      mount(<Dialog id={'dialog'} open={true} draggable={true}> Test </Dialog>)
      cy.get('#dialog h2').should('have.css', 'cursor', 'move');
    });
});
