import React from 'react';
import { mount } from '@cypress/react';
import PatrimoineList from '../../src/operations/PatrimoineList';

describe('PatrimoineList Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/possessions', {
      statusCode: 200,
      body: {
        data: [
          { nom: 'Patrimoine 1', possesseur: { nom: 'Possesseur 1' }, t: '2024-01-01', valeur_comptable: 1000 },
          { nom: 'Patrimoine 2', possesseur: { nom: 'Possesseur 2' }, t: '2024-02-01', valeur_comptable: 2000 }
        ]
      }
    }).as('getPatrimoineList');

    mount(<PatrimoineList />);
  });

  it('should render the PatrimoineList correctly', () => {
    cy.wait('@getPatrimoineList');
    cy.get('.MuiDataGrid-root').should('exist');
    cy.get('.MuiDataGrid-row').should('have.length', 2);
  });

  it('should display the correct fields in PatrimoineList', () => {
    cy.wait('@getPatrimoineList');
    cy.get('.MuiDataGrid-row').first().within(() => {
      cy.get('.MuiDataGrid-cell[data-field="nom"]').should('contain.text', 'Patrimoine 1');
      cy.get('.MuiDataGrid-cell[data-field="possesseur.nom"]').should('contain.text', 'Possesseur 1');
      cy.get('.MuiDataGrid-cell[data-field="t"]').should('contain.text', '2024-01-01');
      cy.get('.MuiDataGrid-cell[data-field="valeur_comptable"]').should('contain.text', '1000');
    });
  });

  it('should display the correct fields in the second row of PatrimoineList', () => {
    cy.wait('@getPatrimoineList');
    cy.get('.MuiDataGrid-row').eq(1).within(() => {
      cy.get('.MuiDataGrid-cell[data-field="nom"]').should('contain.text', 'Patrimoine 2');
      cy.get('.MuiDataGrid-cell[data-field="possesseur.nom"]').should('contain.text', 'Possesseur 2');
      cy.get('.MuiDataGrid-cell[data-field="t"]').should('contain.text', '2024-02-01');
      cy.get('.MuiDataGrid-cell[data-field="valeur_comptable"]').should('contain.text', '2000');
    });
  });
});
