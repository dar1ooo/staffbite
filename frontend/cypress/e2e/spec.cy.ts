describe('basic admin login test', () => {
  it('passes', () => {
    cy.visit('localhost:4200');
    cy.get('#Username').type('dario');
    cy.get('#newPassword').type('dario');
    cy.get('.btn').click();
  });
});

describe('basic add new user test', () => {
  it('passes', () => {
    cy.visit('localhost:4200');
    cy.get('#Username').type('dario');
    cy.get('#newPassword').type('dario');
    cy.get('.btn').click();
    cy.wait(1000);
    cy.get('#navusermanagement').click();
    cy.wait(1000);
    cy.get('#adduser').click();
    cy.get('#Username').type('test user admin');
    cy.get('#exampleInputEmail1').type('testuseradmin@gmail.com');
    cy.get('#flexSwitchCheckDefault').click();
    cy.get('#newPassword').type('testuseradminpassword');
    cy.get('#btnsave').click();
  });
});
