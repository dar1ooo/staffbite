describe('not logged in', () => {
  it('passes', () => {
    cy.visit('localhost:4200/dashboard');
    if (cy.get('.nav-link')) {
      cy.get('.nav-link').click();
    }
    cy.visit('localhost:4200/dashboard');
    cy.get('#notloggedin-msg').should('be.visible');
  });
});

describe('staffbite click', () => {
  it('passes', () => {
    cy.visit('localhost:4200/dashboard');
    if (cy.get('.nav-link')) {
      cy.get('.nav-link').click();
    }
    cy.visit('localhost:4200/dashboard');
    cy.get('#staffbite').click();
    cy.get('#Username').should('be.visible');
  });
});

describe('wrong login', () => {
  it('passes', () => {
    Login('thisuserdoesnteexist', 'thisuserdoesnteexist');
    cy.get('.ng-trigger').should('be.visible');
  });
});

// Region Basic Login and Logout functions

function Login(username: string, password: string): void {
  cy.visit('localhost:4200');
  if (cy.get('.nav-link')) {
    cy.get('.nav-link').click();
  }
  cy.get('#Username').type(username);
  cy.get('#newPassword').type(password);
  cy.get('.btn').click();
  cy.wait(1000);
}

function Logout(): void {
  cy.get('#btnlogout').click();
}
