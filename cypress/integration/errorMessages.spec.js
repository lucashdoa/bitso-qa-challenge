/// <reference types="cypress"/>

describe("Error Messages", () => {
  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("Scenario 1 - Something went wrong error message", () => {
    // 1. Test setup
    const currencies = ["btc", "eth", "bch", "dai", "xrp", "mana"];

    // 2. For every currency, click "Deposit" and check error message
    currencies.forEach((currency) => {
      cy.get(`label[for="${currency}"]`).click();
      cy.get("button:first-child").click();
      cy.get('[data-testid="picker-item"]').first().click();
      cy.get("h3").should("have.text", "Oops! Something went wrong");
      cy.get("h3 + small").should(
        "have.text",
        "Esta transacción excede tu límite. Incrementa tu límite de cuenta para continuar."
      );
      cy.get('[data-testid="modal-close"]').click();
    });
  });

  it("Scenario 2 - Invalid pin error message", () => {
    // 1. Test setup
    cy.intercept("POST", "/api/v3/beneficiaries/**").as("addBeneficiary");
    cy.visit("/r/user/beneficiaries/add");

    // 2. Fill the "Add beneficiary" form with hard coded data
    cy.get("#first_name").type("Random");
    cy.get("#last_name").type("Name");
    cy.get("#second_last_name").type("Second");
    cy.get("label[for='day']").parent().click();
    cy.get("#react-select-2-option-2").click();
    cy.get("label[for='month']").parent().click();
    cy.get("#react-select-3-option-2").click();
    cy.get("label[for='year']").parent().click();
    cy.get("#react-select-4-option-2").click();
    cy.get("label[for='relationship']").parent().click();
    cy.get("#react-select-5-option-2").click();
    cy.get("#percentage").type("25");
    cy.get('[data-testid="add-beneficiary-button"]').click();
    cy.get("#pin").type("123");

    // 3. Click "Confirm" button
    cy.get("button + button").click();

    // 4. Validate that the user receive a 401 (Unauthorized) with incorect PIN error message
    cy.wait("@addBeneficiary").then(({ response }) => {
      expect(response.statusCode).to.be.equal(401);
      expect(response.body.error.message).to.be.equal("Incorrect PIN");
    });
  });
});
