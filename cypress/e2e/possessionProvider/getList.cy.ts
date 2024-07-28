/// <reference types="cypress" />
import PossessionProvider  from '../../../src/providers/possessionProvider';

describe('PossessionProvider getList', () => {
    const resource = "possessions";
    const nomPatrimoine = "testPatrimoine";
    const page = 1;
    const pageSize = 10;

    it('should get a list of possessions', () => {
        cy.intercept('GET', `/patrimoines/${nomPatrimoine}/possessions?page=${page}&page_size=${pageSize}`, {
            statusCode: 200,
            body: {
                data: [
                    { nom: "possession1", valeur_comptable: 1000 },
                    { nom: "possession2", valeur_comptable: 2000 }
                ]
            }
        }).as('getPossessions');
        [{
            "resource": "/home/sullivan/HEI/Projet1/harena-UI/cypress/e2e/possessionProvider/getList.cy.ts",
            "owner": "typescript",
            "code": "2304",
            "severity": 8,
            "message": "Le nom 'cy' est introuvable.",
            "source": "ts",
            "startLineNumber": 28,
            "startColumn": 9,
            "endLineNumber": 28,
            "endColumn": 11
        }]
        cy.wrap(PossessionProvider.getList(resource, nomPatrimoine, page, pageSize))
            .its('data')
            .should('have.length', 2);
        
        cy.wait('@getPossessions');
    });

    it('should handle errors', () => {
        cy.intercept('GET', `/patrimoines/${nomPatrimoine}/possessions?page=${page}&page_size=${pageSize}`, {
            statusCode: 500
        }).as('getPossessionsError');

        cy.wrap(PossessionProvider.getList(resource, nomPatrimoine, page, pageSize))
            .should('be.rejectedWith', Error);

        cy.wait('@getPossessionsError');
    });
});
