Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args)
})

Cypress.Commands.add('dnd', (element, target) => { 
    cy.get(`[data-testid=${element}]`).first().trigger('dragstart');
    cy.get(`[data-testid=${target}]`).first()
      .trigger('dragenter', { force: true })
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true }).wait(50)
      .trigger('dragend', { force: true });
})

Cypress.Commands.add('prepareStore', () => { 
  cy.setCookie('accessToken', '123key');
  cy.intercept('GET', '*api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
  cy.intercept('GET', '*api/auth/user', { fixture: 'user.json' }).as('getUser');
  cy.intercept('POST', '*api/orders', { fixture: 'order.json' }).as('createOrder');
  cy.visit('/');
  cy.getBySel('react-modals').as('reactModals');
})

