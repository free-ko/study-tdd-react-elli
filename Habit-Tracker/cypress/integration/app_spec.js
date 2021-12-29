/// <reference types="cypress" />;
import "@testing-library/cypress/add-commands";

describe("Habit Tracker", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders", () => {
    cy.findByText("Habit Tracker").should("exist");
  });

  it("Adds new habit at the end", () => {
    cy.findByPlaceholderText("Habit").type("New Habit");
    cy.findBytext("Add").click();
    cy.findAllByTestId("habit-name").last().should("have.text", "New Habit");
    cy.findAllByTestId("habit-count").last().should("have.text", "0");
  });

  it("Increase count", () => {
    cy.findAllByTitle("increase").first().click();
    cy.findAllByTestId("habit-count").first().should("have.text", "1");
  });

  it("Decrease count", () => {
    cy.findAllByTitle("increase").first().click();
    cy.findAllByTitle("decrease").first().click();
    cy.findAllByTestId("habit-count").first().should("have.text", "0");
  });

  it("Does not decreases below 0", () => {
    cy.findAllByTitle("decrease").first().click();
    cy.findAllByTestId("habit-count").first().should("have.text", "0");
  });

  it("Shows active count on the header", () => {
    cy.findAllByTitle("increase").first().click();
    cy.findAllByTitle("increase").first().click();
    cy.findByTestId("total-count").should("have.text", "2");
  });

  it("Reset to 0 when clicking reset all", () => {
    cy.findAllByTitle("increase").first().click();
    cy.findAllByTitle("increase").first().click();
    cy.findByText("Reset All").click();
    cy.findAllByTestId("habit-count").each((item) => {
      cy.wrap(item).should("have.text", "0");
    });
  });

  it("Deletes an items", () => {
    cy.findAllByTitle("delete").first().click();
    cy.findAllByTestId("habit-name").findByText("Reading").should("not.exist");
  });
});
