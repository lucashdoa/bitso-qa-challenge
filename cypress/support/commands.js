Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get("#client_id").type(email);
  cy.get("#password").type(password);
  cy.get("button[type='submit']").click();
});
