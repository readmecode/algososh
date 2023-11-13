import { testUrl, currentСircle, submitButton } from "./utils";

describe("Fibonacci test", () => {
  beforeEach(() => {
    cy.visit(`${testUrl}/fibonacci`);
  });

  it("if input empty, button disabled", () => {
    cy.get("input").should("be.empty");
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("fibonacci number renders correctly", () => {
    const inputValue = 5;
    const fibonacciArr = [1, 1, 2, 3, 5, 8];

    cy.get("input").type(inputValue);
    cy.get(submitButton).click();
    for (let j = 0; j <= inputValue; j++) {
      cy.get(currentСircle).each(($el, index) => {
        cy.get($el).contains(fibonacciArr[index]);
      });
      cy.wait(500);
    }
  });
});
