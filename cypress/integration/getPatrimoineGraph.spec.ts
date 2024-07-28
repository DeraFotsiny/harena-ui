/// <reference types="cypress" />

describe('projectionFuture API - Patrimoine Graph', () => {
    it('should fetch the patrimoine graph as an image', () => {
      cy.fixture('projectionFuture.json').then((data) => {
        cy.intercept('GET', '/api/projectionFuture/patrimoineGraph*', {
          statusCode: 200,
          headers: { 'content-type': 'image/png' },
          body: data.patrimoineGraph
        }).as('getPatrimoineGraph');
  
        cy.window().then(async (win: any) => {
          const response = await win.projectionFutureProvider.getPatrimoineGraph(
            'projectionFuture',
            'myPortfolio',
            '2024-01-01',
            '2024-12-31'
          );
          expect(response).to.eq(data.patrimoineGraph);
        });
  
        cy.wait('@getPatrimoineGraph').its('response.statusCode').should('eq', 200);
      });
    });
  });