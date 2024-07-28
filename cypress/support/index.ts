import './commands';

const projectionFutureProvider = require('src/providers/projectionFutureProvider').default;

Cypress.on('window:before:load', (win: any) => {
  win.projectionFutureProvider = projectionFutureProvider;
});

// Catching and handling uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  console.log('Uncaught exception:', err);
  return false;
});

// Configure global settings here
Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true
});