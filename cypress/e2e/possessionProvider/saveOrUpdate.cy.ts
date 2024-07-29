/// <reference types="cypress" />
import PossessionProvider from '../../../src/providers/possessionProvider';

describe('PossessionProvider save or Update', () => {
    const resource = "possessions";
    const nomPatrimoine = "testPatrimoine";
    const page = 1;
    const pageSize = 10;
    const payload = { type: "ARGENT", argent: { nom: "newPossession", valeur_comptable: 3000 } };
    const apiUrl = Cypress.env('VITE_API_URL');

    it('should save or update a possession', () => {
        cy.intercept('PUT', `${apiUrl}/patrimoines/${nomPatrimoine}/possessions?page=${page}&page_size=${pageSize}`, {
            statusCode: 200,
            body: {
                data: [payload]
            }
        }).as('saveOrUpdatePossession');

        cy.wrap(PossessionProvider.saveOrUpdate(resource, nomPatrimoine, payload, page, pageSize))
            .its('data')
            .should('have.length', 1)
            .and('deep.include', payload);
        
        cy.wait('@saveOrUpdatePossession');
    });

    it('should handle errors', () => {
        cy.intercept('PUT', `${apiUrl}/patrimoines/${nomPatrimoine}/possessions?page=${page}&page_size=${pageSize}`, {
            statusCode: 500
        }).as('saveOrUpdatePossessionError');

        cy.wrap(PossessionProvider.saveOrUpdate(resource, nomPatrimoine, payload, page, pageSize))
            .should('be.rejectedWith', Error);

        cy.wait('@saveOrUpdatePossessionError');
    });
});
