/// <reference types="Cypress" />

import "@testing-library/cypress/add-commands";

describe("Youtube", () => {
  beforeEach(() => {
    cy.intercept("GET", /(Celtic)/g, {
      fixture: "popular.json",
    }).as("getMostPopular");
    cy.visit("/");
  });

  it("Render", () => {
    cy.findByText("Youtube").should("exist");
  });

  it("Display most popular videos first", () => {
    cy.findByText("The Celtic Way").should("exist");
  });
});
