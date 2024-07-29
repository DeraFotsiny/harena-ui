/// <reference types="cypress" />
import PossessionProvider from '../../../src/providers/possessionProvider';

describe('PossessionProvider getList', () => {
    const resource = "possessions";
    const nomPatrimoine = "testPatrimoine";
    const page = 1;
    const pageSize = 10;
    const apiUrl = Cypress.env('VITE_API_URL');

    it('should get a list of possessions', () => {
        cy.intercept('GET', `${apiUrl}/patrimoines/${nomPatrimoine}/possessions?page=${page}&page_size=${pageSize}`, {
            statusCode: 200,
            body: {
                data: [
                    { nom: "possession1", valeur_comptable: 1000 },
                    { nom: "possession2", valeur_comptable: 2000 }
                ]
            }
        }).as('getPossessions');

        cy.wrap(PossessionProvider.getList(resource, nomPatrimoine, page, pageSize))
            .its('data')
            .should('have.length', 2);
        
        cy.wait('@getPossessions');
    });

    it('should handle errors', () => {
        cy.intercept('GET', `${apiUrl}/patrimoines/${nomPatrimoine}/possessions?page=${page}&page_size=${pageSize}`, {
            statusCode: 500
        }).as('getPossessionsError');

        cy.wrap(PossessionProvider.getList(resource, nomPatrimoine, page, pageSize))
            .should('be.rejectedWith', Error);

        cy.wait('@getPossessionsError');
    });
});
