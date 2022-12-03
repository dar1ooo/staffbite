describe('admin login', () => {
  it('passes', () => {
    AdminLogin('dario', 'dario');
    AdminLogout();
  });
});

describe('add new user', () => {
  it('passes', () => {
    AdminLogin('dario', 'dario');
    cy.get('#navusermanagement').click();
    cy.wait(1000);
    cy.get('#adduser').click();
    cy.get('#Username').type('test user admin');
    cy.get('#exampleInputEmail1').type('testuseradmin@gmail.com');
    cy.get('#flexSwitchCheckDefault').click();
    cy.get('#newPassword').type('testuseradminpassword');
    cy.get('#btnsave').click();
    cy.get('#btnsave').click();
    cy.wait(1000);
    cy.get('.ng-trigger > .ng-tns-c46-0').should('be.visible');
    cy.get('.ng-trigger > .ng-tns-c46-0').click();
    AdminLogout();
  });
});

describe('view teacher skills', () => {
  it('passes', () => {
    AdminLogin('dario', 'dario');
    cy.get('#navusermanagement').click();
    cy.wait(1000);
    cy.get('#teacherskills0').click();
    cy.get('.completedmessage').should('be.visible');
    AdminLogout();
  });
});

// Region Basic Login and Logout functions
function AdminLogin(username: string, password: string): void {
  cy.visit('localhost:4200');
  if (cy.get('.nav-link')) {
    cy.get('.nav-link').click();
  }
  cy.get('#Username').type(username);
  cy.get('#newPassword').type(password);
  cy.get('.btn').click();
  cy.wait(1000);
}

function AdminLogout(): void {
  cy.get('#btnlogout').click();
}
