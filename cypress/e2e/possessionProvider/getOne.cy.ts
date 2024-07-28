/// <reference types="cypress" />
import PossessionProvider  from '../../../src/providers/possessionProvider';
describe('PossessionProvider getOne', () => {
    const resource = "possessions";
    const nomPatrimoine = "testPatrimoine";
    const nomPossession = "testPossession";

    it('should get a single possession', () => {
        cy.intercept('GET', `/patrimoines/${nomPatrimoine}/possessions/${nomPossession}`, {
            statusCode: 200,
            body: {
                nom: nomPossession,
                valeur_comptable: 1000
            }
        }).as('getPossession');

        cy.wrap(PossessionProvider.getOne(resource, nomPatrimoine, nomPossession))
            .its('data')
            .should('have.property', 'nom', nomPossession);
        
        cy.wait('@getPossession');
    });

    it('should handle errors', () => {
        cy.intercept('GET', `/patrimoines/${nomPatrimoine}/possessions/${nomPossession}`, {
            statusCode: 404
        }).as('getPossessionError');

        cy.wrap(PossessionProvider.getOne(resource, nomPatrimoine, nomPossession))
            .should('be.rejectedWith', Error);

        cy.wait('@getPossessionError');
    });
});
