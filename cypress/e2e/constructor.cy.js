describe('drug ingredients to container works correctly', () => {
  beforeEach(() => {
    cy.intercept('GET', '*api/ingredients*', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
  });

  it('should drug bun', () => {
    cy.getBySel('ingredient_bun').should('exist')
    cy.getBySel('bun_container').should('exist');
    
    cy.dnd('ingredient_bun', 'bun_container');

    cy.getBySel('bun_element').should('have.length', 2);
  })

 
  it('should drug ingredient', () => {
    cy.getBySel('ingredient_item').should('exist')
    cy.getBySel('item_container').should('exist');

    cy.dnd('ingredient_item', 'item_container');

    cy.get('[data-testid="item_container"]').get('[data-testid="item_element"]').should('have.length.least', 1);
  })
})

describe('ingredients modal works correctly', () => {
  beforeEach(() => {
    cy.intercept('GET', '*api/ingredients*', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
  });

  it('should work open modal', () => {
    cy.getBySel('ingredient_item').should('exist');
    cy.getBySel('react-modals').should('exist');

    let text = '';

    cy.getBySel('ingredient_item').first().then(($lnk) => {
      $lnk.click();
    })
    .find('img')
    .then(($img) => {
      text = $img.attr('alt');
      cy.getBySel('react-modals').find('[data-testid="ingredient_name"]')
        .should("have.text", text);
    });
  })

  it('should work close modal on button click', () => {
    cy.getBySel('ingredient_item').should('exist');
    cy.getBySel('react-modals').should('exist');

    cy.getBySel('ingredient_item').first().click();

    cy.getBySel('react-modals').should('exist');
    cy.getBySel('modal_overlay').should('exist');

    cy.getBySel('react-modals').find('[data-testid="modal_close_btn"]').click();

    cy.getBySel('react-modals').should('not.be.visible');

  })

  it('should work close modal on overlay click', () => {
    cy.getBySel('ingredient_item').should('exist');
    cy.getBySel('react-modals').should('exist');

    cy.getBySel('ingredient_item').first().click();

    cy.getBySel('react-modals').should('exist');
    cy.getBySel('modal_overlay').should('exist');

    cy.getBySel('react-modals').find('[data-testid="modal_overlay"]').trigger('click', { force: true });

    cy.getBySel('react-modals').should('not.be.visible');

  })
})

describe('order modal works correctly', () => {
  it.only('should work order', () => {
    cy.prepareStore();

    cy.getBySel('react-modals').should('exist');
    cy.dnd('ingredient_bun', 'bun_container');
    cy.dnd('ingredient_item', 'item_container');

    cy.getBySel('create_order_btn').should('not.be.disabled');
    cy.getBySel('create_order_btn').click();

    cy.getBySel('react-modals').find('[data-testid="order_number"]')
        .should("have.text", "123");
  })
})
