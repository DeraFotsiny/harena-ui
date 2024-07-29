import React from 'react';
import { mount } from '@cypress/react';
import PossessionList from '../../src/operations/PossessionList';

describe('PossessionList Component', () => {
    beforeEach(() => {
        mount(<PossessionList />);
    });

    it('should render the ArgentList correctly', () => {
        cy.get('[data-testid="argent-list"]').should('exist');
        cy.get('[data-testid="argent-item"]').should('have.length', 6); 
    });

    it('should display the correct fields in ArgentList', () => {
        cy.get('[data-testid="argent-item"]').first().within(() => {
            cy.get('[data-testid="type"]').should('exist');
            cy.get('[data-testid="nom-argent"]').should('exist');
            cy.get('[data-testid="date"]').should('exist');
            cy.get('[data-testid="valeur-comptable"]').should('exist');
            cy.get('[data-testid="devise-nom"]').should('exist');
            cy.get('[data-testid="devise-code"]').should('exist');
        });
    });

    it('should render the MaterielList correctly', () => {
        cy.get('[data-testid="materiel-list"]').should('exist');
        cy.get('[data-testid="materiel-item"]').should('have.length', 8); 
    });

    it('should display the correct fields in MaterielList', () => {
        cy.get('[data-testid="materiel-item"]').first().within(() => {
            cy.get('[data-testid="type"]').should('exist');
            cy.get('[data-testid="nom-materiel"]').should('exist');
            cy.get('[data-testid="date"]').should('exist');
            cy.get('[data-testid="valeur-comptable"]').should('exist');
            cy.get('[data-testid="devise-nom"]').should('exist');
            cy.get('[data-testid="taux-dappreciation"]').should('exist');
            cy.get('[data-testid="date-acquisition"]').should('exist');
            cy.get('[data-testid="devise-code"]').should('exist');
        });
    });

    it('should render the FluxArgentList correctly', () => {
        cy.get('[data-testid="flux-argent-list"]').should('exist');
        cy.get('[data-testid="flux-argent-item"]').should('have.length', 5); 
    });

    it('should display the correct fields in FluxArgentList', () => {
        cy.get('[data-testid="flux-argent-item"]').first().within(() => {
            cy.get('[data-testid="type"]').should('exist');
            cy.get('[data-testid="nom-flux-argent"]').should('exist');
            cy.get('[data-testid="date"]').should('exist');
            cy.get('[data-testid="valeur-comptable"]').should('exist');
            cy.get('[data-testid="devise-nom"]').should('exist');
        });
    });
});