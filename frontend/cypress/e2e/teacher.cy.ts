describe('teacher login', () => {
  it('passes', () => {
    TeacherLogin('teacher', 'teacher');
    cy.get('#btnlogout').click();
  });
});

describe('teacher check skill', () => {
  it('passes', () => {
    TeacherLogin('teacher', 'teacher');
    cy.get('#skills').click();
    cy.wait(1000);
    cy.get(':nth-child(2) > .subskills > td > .skill-area').click();
    cy.get(':nth-child(2) > .subskills > td > .skill-area').should(
      'have.class',
      'skill-checked'
    );
    TeacherLogout();
  });
});

describe('teacher timer', () => {
  it('passes', () => {
    TeacherLogin('teacher', 'teacher');
    cy.get('#navtimer').click();
    cy.wait(1000);
    cy.get('.timer-input').type('10');
    cy.get('.btn').click();
    cy.get('.custom-style > :nth-child(1) > :nth-child(1)').should(
      'be.visible'
    );
    TeacherLogout();
  });
});

describe('teacher random groups', () => {
  it('passes', () => {
    TeacherLogin('teacher', 'teacher');
    cy.get('#navusermanagement').click();
    cy.wait(1000);
    const topics = 'Dos, DDos, MITM, Phishing, Ransomware, SQL Injection, XSS';
    const students =
      'student1, student2, student3, student4, student5, student6, student7, student8, student9, student10, student11, student12, student13, student14';
    cy.get('#topics').type(topics);
    cy.get('#students').type(students);
    cy.get('#btngenerate').click();
    cy.get('#randomgroups').should('be.visible');
    TeacherLogout();
  });
});

describe('change teacher profile settings', () => {
  it('passes', () => {
    TeacherLogin('teacher', 'teacher');
    cy.get('#navsettings').click();
    cy.wait(1000);
    cy.get('#Username').clear();
    cy.get('#Username').type('teacher1');
    cy.get('#exampleInputEmail1').clear();
    cy.get('#exampleInputEmail1').type('teacher1@gmail.com');
    cy.get('.btn').click();
    TeacherLogin('teacher1', 'teacher');
    cy.get('#navsettings').click();
    cy.wait(1000);
    cy.get('#Username').clear();
    cy.get('#Username').type('teacher');
    cy.get('#exampleInputEmail1').clear();
    cy.get('#exampleInputEmail1').type('teacher@gmail.com');
    cy.get('.btn').click();
    TeacherLogout();
  });
});

// Region Basic Login and Logout functions
function TeacherLogin(username: string, password: string): void {
  cy.visit('localhost:4200');
  if (cy.get('.nav-link')) {
    cy.get('.nav-link').click();
  }
  cy.get('#Username').type(username);
  cy.get('#newPassword').type(password);
  cy.get('.btn').click();
  cy.wait(1000);
}

function TeacherLogout(): void {
  cy.get('#btnlogout').click();
}
