/// <reference types="cypress" />;
import cy from "cypress";

import "@testing-library/cypress/add-commands";

describe("Habit Tracker", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  cy.it("Renders", () => {
    cy.findByText("Habit Tracker").should("exist");
  });
});
