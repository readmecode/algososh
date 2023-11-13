import {
  testUrl,
  currentСircle,
  currentСircleWithSettings,
  submitButton,
} from "./utils";

describe("Stack test", () => {
  beforeEach(() => {
    cy.visit(`${testUrl}/stack`);
  });

  it("if input empty, button disabled", () => {
    cy.get("input").should("be.empty");
    cy.get(submitButton).should("be.disabled");
  });

  it("The element is being added correctly", () => {
    cy.get("input").type("1");
    cy.get(submitButton).click();
    const numbers = [1, 2, 3];

    cy.get(currentСircleWithSettings)
      .should("have.length", 1)
      .each((el, index) => {
        cy.wrap(el).contains(numbers[index]);
      });

    cy.get(currentСircle)
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.wait(500);

    cy.get(currentСircle)
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)");

    cy.get("input").type("2");
    cy.get(submitButton).click();

    cy.get(currentСircleWithSettings)
      .should("have.length", 2)
      .each((el, index) => {
        cy.wrap(el).contains(numbers[index]);
      });

    cy.get(currentСircle)
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.wait(500);

    cy.get(currentСircle)
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)");

    cy.get("input").type("3");
    cy.get(submitButton).click();

    cy.get(currentСircleWithSettings)
      .should("have.length", 3)
      .each((el, index) => {
        cy.wrap(el).contains(numbers[index]);
      });

    cy.get(currentСircle)
      .eq(2)
      .should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.wait(500);

    cy.get(currentСircle)
      .eq(2)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
  });

  it("The element is deleted correctly", () => {
    cy.get("input").type("1");
    cy.get(submitButton).click();
    cy.get(currentСircleWithSettings).should("exist");
    cy.wait(500);
    cy.get(currentСircle)
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get("[data-testid=button-delete]").click();

    cy.get(currentСircle)
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.wait(500);
    cy.get(currentСircleWithSettings).should("not.exist");
  });

  it("The clear button deletes all stack elements", () => {
    cy.get("input").type("1");
    cy.get(submitButton).click();
    cy.wait(500);
    cy.get("input").type("2");
    cy.get(submitButton).click();
    cy.wait(500);
    cy.get("button[type='reset']").click();
    cy.get(currentСircleWithSettings).should("not.exist");
  });
});
