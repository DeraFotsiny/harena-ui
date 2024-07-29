/// <reference types="cypress" />

import patrimoineProvider from '../../../src/providers/patrimoineProvider'; 
import { Patrimoine } from '../../../src/providers/gen'; 

describe('patrimoineProvider', () => {
  const resource = "patrimoines";
  const apiUrl = Cypress.env('VITE_API_URL');

  context('getOne', () => {
    const nom = "testPatrimoine";

    it('should get one patrimoine by nom', () => {
      cy.intercept('GET', `${apiUrl}/patrimoines/${nom}`, {
        statusCode: 200,
        body: { nom: "testPatrimoine", valeur_comptable: 1000 }
      }).as('getPatrimoine');

      cy.wrap(patrimoineProvider.getOne(resource, nom))
        .its('data')
        .should('deep.include', { nom: "testPatrimoine", valeur_comptable: 1000 });

      cy.wait('@getPatrimoine');
    });

    it('should handle errors', () => {
      cy.intercept('GET', `${apiUrl}/patrimoines/${nom}`, {
        statusCode: 500
      }).as('getPatrimoineError');

      cy.wrap(patrimoineProvider.getOne(resource, nom))
        .should('be.rejectedWith', Error);

      cy.wait('@getPatrimoineError');
    });
  });

  context('getList', () => {
    const page = 1;
    const pageSize = 10;

    it('should get a list of patrimoines', () => {
      cy.intercept('GET', `${apiUrl}/patrimoines?page=${page}&page_size=${pageSize}`, {
        statusCode: 200,
        body: { data: [{ nom: "patrimoine1", valeur_comptable: 1000 }, { nom: "patrimoine2", valeur_comptable: 2000 }] }
      }).as('getPatrimoines');

      cy.wrap(patrimoineProvider.getList(resource, page, pageSize))
        .its('data')
        .should('have.length', 2);

      cy.wait('@getPatrimoines');
    });

    it('should handle errors', () => {
      cy.intercept('GET', `${apiUrl}/patrimoines?page=${page}&page_size=${pageSize}`, {
        statusCode: 500
      }).as('getPatrimoinesError');

      cy.wrap(patrimoineProvider.getList(resource, page, pageSize))
        .should('be.rejectedWith', Error);

      cy.wait('@getPatrimoinesError');
    });
  });

  context('saveOrUpdate', () => {
    const payload: Patrimoine = { nom: "newPatrimoine", valeur_comptable: 3000 };

    it('should save or update a patrimoine', () => {
      cy.intercept('POST', `${apiUrl}/patrimoines`, {
        statusCode: 200,
        body: { data: [{ nom: "newPatrimoine", valeur_comptable: 3000 }] }
      }).as('saveOrUpdatePatrimoine');

      cy.wrap(patrimoineProvider.saveOrUpdate(resource, payload))
        .its('data')
        .should('deep.include', { nom: "newPatrimoine", valeur_comptable: 3000 });

      cy.wait('@saveOrUpdatePatrimoine');
    });

    it('should handle errors', () => {
      cy.intercept('POST', `${apiUrl}/patrimoines`, {
        statusCode: 500
      }).as('saveOrUpdatePatrimoineError');

      cy.wrap(patrimoineProvider.saveOrUpdate(resource, payload))
        .should('be.rejectedWith', Error);

      cy.wait('@saveOrUpdatePatrimoineError');
    });
  });
});
