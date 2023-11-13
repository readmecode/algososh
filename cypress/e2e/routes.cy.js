import { testUrl } from "./utils";

describe("Routing works correctly", () => {
  beforeEach(function () {
    cy.visit(testUrl);
  });

  it("The default home page has opened", () => {
    cy.contains("МБОУ АЛГОСОШ");

    cy.get("a").should(($a) => {
      expect($a).to.have.length(6);
    });
  });
  it("Transitions to all pages work correctly", () => {
    const pages = [
      "recursion",
      "fibonacci",
      "sorting",
      "stack",
      "queue",
      "list",
    ];
    pages.forEach((page) => {
      cy.get(`a[href*=${page}]`).click();
      cy.go("back");
    });
  });
});
