/// <reference types="cypress" />

describe('projectionFuture API - Impossible Flux Data', () => {
    it('should fetch patrimoine flux data and add an ID field to each item', () => {
      cy.fixture('projectionFuture.json').then((data) => {
        cy.intercept('GET', '/api/projectionFuture/patrimoineFluxImpossibles*', {
          statusCode: 200,
          body: data.patrimoineFluxImpossibles
        }).as('getPatrimoineFluxImpossibles');
  
        cy.window().then(async (win: any) => {
          const response = await win.projectionFutureProvider.getImpossibleFLux(
            'projectionFuture',
            'myPortfolio',
            '2024-01-01',
            '2024-12-31'
          );
          expect(response.data).to.have.length(2);
          expect(response.data[0]).to.have.property('id');
          expect(response.data[1]).to.have.property('id');
        });
  
        cy.wait('@getPatrimoineFluxImpossibles').its('response.statusCode').should('eq', 200);
      });
    });
  });