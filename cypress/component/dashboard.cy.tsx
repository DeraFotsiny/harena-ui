import React from 'react';
import { mount } from '@cypress/react';
import Dashboard from '../../src/operations/Dashboard';

describe('Dashboard Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/patrimoines', {
      statusCode: 200,
      body: {
        data: [
          { nom: 'Patrimoine 1', t: '2024-01-01' }
        ]
      }
    }).as('getPatrimoines');

    cy.intercept('GET', '/projectionFuture?nomPatrimoine=Patrimoine 1&debut=2024-01-01&fin=*', {
      statusCode: 200,
      body: 'image-base64-string' 
    }).as('getProjectionGraph');

    mount(<Dashboard/>);
  });

  it('should render the Dashboard correctly', () => {
    cy.get('.MuiCard-root').should('exist'); 
    cy.get('.MuiCardHeader-title').should('contain.text', 'Dashboard'); 
    cy.get('input[type="date"]').should('exist');
    cy.get('button').should('exist'); 
  });

  it('should fetch and display the graph correctly when a date is entered and button is clicked', () => {
    cy.get('input[type="date"]').type('2024-12-31');
    cy.get('button').click();
    cy.wait('@getPatrimoines');
    cy.wait('@getProjectionGraph');
    cy.get('img').should('exist');
    cy.get('img').should('have.attr', 'src').and('include', 'image-base64-string'); 
  });

  it('should display loading indicator while fetching data', () => {
    cy.get('input[type="date"]').type('2024-12-31'); 
    cy.get('button').click(); 
    cy.get('p').contains('Loading...').should('exist');
  });

  it('should display "No data available" when there is no image', () => {
    cy.intercept('GET', '/projectionFuture?nomPatrimoine=Patrimoine 1&debut=2024-01-01&fin=*', {
      statusCode: 200,
      body: null  
    }).as('getProjectionGraphNoData');

    cy.get('input[type="date"]').type('2024-12-31');
    cy.get('button').click();
    cy.wait('@getPatrimoines');
    cy.wait('@getProjectionGraphNoData');
    cy.get('p').contains('No data available').should('exist');
  });
});
