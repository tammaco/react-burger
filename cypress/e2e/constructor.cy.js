describe('drug ingredients to container works correctly', () => {
  beforeEach(() => {
    cy.intercept('GET', '*api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.getBySel('ingredient_item').as('ingredientItem');
    cy.getBySel('react-modals').as('reactModals');
  });

  it('should drug bun', () => {
    cy.getBySel('ingredient_bun').should('exist')
    cy.getBySel('bun_container').should('exist');
    
    cy.dnd('ingredient_bun', 'bun_container');

    cy.getBySel('bun_element').should('have.length', 2);
  })

 
  it('should drug ingredient', () => {
    cy.get('@ingredientItem').should('exist')
    cy.getBySel('item_container').should('exist');

    cy.dnd('ingredient_item', 'item_container');

    cy.get('[data-testid="item_container"]').get('[data-testid="item_element"]').should('have.length.least', 1);
  })
})

describe('ingredients modal works correctly', () => {
  beforeEach(() => {
    cy.intercept('GET', '*api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.getBySel('ingredient_item').as('ingredientItem');
    cy.getBySel('react-modals').as('reactModals');
  });

  it('should work open modal', () => {
    cy.get('@ingredientItem').should('exist');
    cy.get('@reactModals').should('exist');

    let text = '';

    cy.get('@ingredientItem').first().then(($lnk) => {
      $lnk.click();
    })
    .find('img')
    .then(($img) => {
      text = $img.attr('alt');
      cy.get('@reactModals').find('[data-testid="ingredient_name"]')
        .should("have.text", text);
    });
  })

  it('should work close modal on button click', () => {
    cy.get('@ingredientItem').should('exist');
    cy.get('@reactModals').should('exist');

    cy.get('@ingredientItem').first().click();

    cy.getBySel('modal_overlay').should('exist');

    cy.get('@reactModals').find('[data-testid="modal_close_btn"]').click();
    cy.get('@reactModals').should('not.be.visible');

  })

  it('should work close modal on overlay click', () => {
    cy.get('@ingredientItem').should('exist');
    cy.get('@reactModals').should('exist');

    cy.get('@ingredientItem').first().click();

    cy.getBySel('modal_overlay').should('exist');

    cy.get('@reactModals').find('[data-testid="modal_overlay"]').trigger('click', { force: true });

    cy.get('@reactModals').should('not.be.visible');

  })
})

describe('order modal works correctly', () => {
  it('should work order', () => {
    cy.prepareStore();

    cy.get('@reactModals').should('exist');
    cy.dnd('ingredient_bun', 'bun_container');
    cy.dnd('ingredient_item', 'item_container');

    cy.getBySel('create_order_btn').should('not.be.disabled');
    cy.getBySel('create_order_btn').click();

    cy.get('@reactModals').find('[data-testid="order_number"]')
        .should("have.text", "123");
  })
})
