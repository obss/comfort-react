import { ComfortReactProvider, Switch } from '../../src/lib';

describe('Switch tests', () => {
    it('mount test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} label={'label text'} />
            </ComfortReactProvider>
        );
        cy.get('#switch').should('be.visible');
    });
    it('size test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} label={'label text'} />
            </ComfortReactProvider>
        );
        cy.get('#switch label span').should('have.css', 'width', '58px');
        cy.get('#switch label span').should('have.css', 'height', '38px');
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} label={'label text'} size={'small'} />
            </ComfortReactProvider>
        );
        cy.get('#switch label span').should('have.css', 'width', '40px');
        cy.get('#switch label span').should('have.css', 'height', '24px');
    });
    it('placement test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} label={'label text'} labelProps={{ labelPlacement: 'end' }} />
            </ComfortReactProvider>
        );
        cy.get('#switch').get('label').should('have.class', 'MuiFormControlLabel-labelPlacementEnd');
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} label={'label text'} labelProps={{ labelPlacement: 'bottom' }} />
            </ComfortReactProvider>
        );
        cy.get('#switch').get('label').should('have.class', 'MuiFormControlLabel-labelPlacementBottom');
    });
    it('label test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} label={'label text'} />
            </ComfortReactProvider>
        );
        cy.get('#switch').get('label').contains('label text');
    });
    it('disabled test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} label={'label text'} value={true} />
            </ComfortReactProvider>
        );
        cy.get('#switch').get('span').should('have.css', 'cursor', 'pointer');
        cy.get('#switch label span span input').should('not.be.disabled');
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} label={'label text'} disabled={true} value={true} />
            </ComfortReactProvider>
        );
        cy.get('#switch').get('span').should('have.css', 'cursor', 'default');
        cy.get('#switch label span span input').should('be.disabled');
    });
    it('custom theme test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} value={true} label={'label text'} color={'primary'} />
            </ComfortReactProvider>
        );
        cy.get('#switch label span span').should('have.css', 'color', 'rgb(25, 118, 210)');
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} value={true} label={'label text'} color={'secondary'} />
            </ComfortReactProvider>
        );
        cy.get('#switch label span span').should('have.css', 'color', 'rgb(156, 39, 176)');
    });
    it('blur test', () => {
        const handleBlur = () => {
            alert('blurred');
        };
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} label={'label text'} />
            </ComfortReactProvider>
        );
        cy.get('#switch').click();
        cy.get('body').click();
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} label={'label text'} onBlur={handleBlur()} />
            </ComfortReactProvider>
        );
        cy.get('#switch').click();
        cy.get('body').click();
        cy.on('window:alert', (text) => {
            expect(text).to.contains('blurred');
        });
    });
    it('true and false label test', () => {
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} label={'label text'} />
            </ComfortReactProvider>
        );
        cy.get('#switch').get('label').contains('label text');
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} value={true} trueLabel={'true label text'} falseLabel={'false label text'} />
            </ComfortReactProvider>
        );
        cy.get('#switch').get('label').contains('true label text');
        cy.mount(
            <ComfortReactProvider>
                <Switch id={'switch'} value={false} trueLabel={'true label text'} falseLabel={'false label text'} />
            </ComfortReactProvider>
        );
        cy.get('#switch').get('label').contains('false label text');
    });
});
