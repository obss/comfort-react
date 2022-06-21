import { mount } from '@cypress/react';
import { pink } from '@mui/material/colors';
import { Switch } from '../../src/lib';

describe('Switch tests', () => {
    it('mount test', () => {
        mount(<Switch id={'switch'} label={'label text'} />);
        cy.get('#switch').should('be.visible');
    });
    it('size test', () => {
        mount(<Switch id={'switch'} label={'label text'} />);
        cy.get('#switch label span').should('have.css', 'width', '58px');
        cy.get('#switch label span').should('have.css', 'height', '38px');
        mount(<Switch id={'switch'} label={'label text'} size={'small'} />);
        cy.get('#switch label span').should('have.css', 'width', '40px');
        cy.get('#switch label span').should('have.css', 'height', '24px');
    });
    it('placement test', () => {
        mount(<Switch id={'switch'} label={'label text'} labelProps={{ labelPlacement: 'end' }} />);
        cy.get('#switch').get('label').should('have.class', 'MuiFormControlLabel-labelPlacementEnd');
        mount(<Switch id={'switch'} label={'label text'} labelProps={{ labelPlacement: 'bottom' }} />);
        cy.get('#switch').get('label').should('have.class', 'MuiFormControlLabel-labelPlacementBottom');
    });
    it('label test', () => {
        mount(<Switch id={'switch'} label={'label text'} />);
        cy.get('#switch').get('label').contains('label text');
    });
    it('disabled test', () => {
        mount(<Switch id={'switch'} label={'label text'} value={true} />);
        cy.get('#switch').get('span').should('have.css', 'cursor', 'pointer');
        cy.get('#switch label span span input').should('not.be.disabled');
        mount(<Switch id={'switch'} label={'label text'} disabled={true} value={true} />);
        cy.get('#switch').get('span').should('have.css', 'cursor', 'default');
        cy.get('#switch label span span input').should('be.disabled');
    });
    it('custom theme test', () => {
        mount(<Switch id={'switch'} value={true} label={'label text'} color={'primary'} />);
        cy.get('#switch label span span').should('have.css', 'color', 'rgb(25, 118, 210)');
        mount(<Switch id={'switch'} value={true} label={'label text'} color={'secondary'} />);
        cy.get('#switch label span span').should('have.css', 'color', 'rgb(156, 39, 176)');
    });
    it('blur test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        mount(<Switch id={'switch'} label={'label text'} />);
        cy.get('#switch').click();
        cy.get('body').click();
        mount(<Switch id={'switch'} label={'label text'} onBlur={handleBlur()} />);
        cy.get('#switch').click();
        cy.get('body').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('true and false label test', () => {
        mount(<Switch id={'switch'} label={'label text'} />);
        cy.get('#switch').get('label').contains('label text');
        mount(<Switch id={'switch'} value={true} trueLabel={'true label text'} falseLabel={'false label text'} />);
        cy.get('#switch').get('label').contains('true label text');
        mount(<Switch id={'switch'} value={false} trueLabel={'true label text'} falseLabel={'false label text'} />);
        cy.get('#switch').get('label').contains('false label text');
    });
});
