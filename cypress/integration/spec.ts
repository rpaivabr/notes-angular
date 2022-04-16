describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the initial project page', () => {
    cy.title().should('equal', 'NotesAngular');
    cy.contains('My Notes');
  });

  it('Add new Angular category', () => {
    cy.get('button').first().click();
    cy.get('[type=color]').invoke('val', '#f6c2d9').trigger('input');
    cy.contains('Name').click().type('Angular');
    cy.get('button').contains('Confirm').click();
  });

  it('Add new React category', () => {
    cy.get('button').first().click();
    cy.get('[type=color]').invoke('val', '#a1c8e9').trigger('input');
    cy.contains('Name').click().type('React');
    cy.get('button').contains('Confirm').click();
  });

  it('Add new Vue category', () => {
    cy.get('button').first().click();
    cy.get('[type=color]').invoke('val', '#bcdfc9').trigger('input');
    cy.contains('Name').click().type('Vue');
    cy.get('button').contains('Confirm').click();
  });
});
