import { testUrl, currentСircle, currentСircleWithSettings } from "./utils";

describe("list test", () => {
  beforeEach(() => {
    cy.visit(`${testUrl}/list`);
  });

  it("if input empty, buttons disabled", () => {
    cy.get('input[placeholder="Введите значение"]').should("be.empty");
    cy.contains("Добавить в head").should("be.disabled");
    cy.contains("Добавить в tail").should("be.disabled");
    cy.contains("Добавить по индексу").should("be.disabled");
    cy.contains("Удалить по индексу").should("be.disabled");
  });

  it("rendering the default list", () => {
    const initialArray = ["0", "34", "8", "1"];
    cy.get(currentСircleWithSettings).should("have.length", 4);

    cy.get(currentСircle).each(($el, index) => {
      cy.get($el).contains(initialArray[index]);
      cy.get($el).should("have.css", "border-color", "rgb(0, 50, 255)");
    });
  });

  it("Adding an element to the head is done correctly", () => {
    cy.get("input").eq(0).type("8");
    cy.get("button").eq(1).click();

    cy.get(currentСircle)
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("8");

    cy.wait(500);
    cy.get(currentСircle)
      .eq(0)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("8");

    cy.get(currentСircleWithSettings).eq(0).contains("head").should("exist");
    cy.wait(500);

    cy.get(currentСircle)
      .eq(0)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("8");
  });

  it("Adding an element to the tail is done correctly", () => {
    cy.get("input").eq(0).type("12");
    cy.get("button").eq(2).click();

    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 3) {
        cy.wrap(el).find("[class*=circle_small]").contains("12");
      }
    });
    cy.wait(500);
    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 4) {
        cy.wrap(el)
          .find(currentСircle)
          .should("have.css", "border-color", "rgb(127, 224, 81)")
          .contains("12");
      }
    });
    cy.wait(500);
    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 4) {
        cy.wrap(el)
          .find(currentСircle)
          .should("have.css", "border-color", "rgb(0, 50, 255)")
          .contains("12");
        cy.wrap(el).contains("tail");
      }
    });
  });

  it("Deleting an element from the head is done correctly", () => {
    cy.get("button").eq(3).click();
    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 0) {
        cy.wrap(el).find("[class*=circle_small]").contains("0");
        cy.get(el).should("not.have.text", "head");
      }
    });
    cy.wait(500);
    cy.get(currentСircleWithSettings)
      .should("have.length", 3)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains("head");
          cy.wrap(el).contains("34");
        }
      });
  });

  it("Deleting an element from the tail is done correctly", () => {
    cy.get("button").eq(4).click();
    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 3) {
        cy.wrap(el).find("[class*=circle_small]").contains("1");
        cy.get(el).should("not.have.text", "tail");
      }
    });
    cy.wait(500);
    cy.get(currentСircleWithSettings)
      .should("have.length", 3)
      .each((el, index) => {
        if (index === 2) {
          cy.wrap(el).contains("tail");
          cy.wrap(el).contains("8");
        }
      });
  });

  it("Checking the addition of an element by index", () => {
    cy.get("input").eq(0).click().type("12");

    cy.get("input").eq(1).type(2);
    cy.get("button").eq(5).click();
    cy.wait(500);
    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 0) {
        cy.wrap(el).find("[class*=circle_small]").contains("12");
      }
    });
    cy.wait(500);
    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 0) {
        cy.wrap(el).find("[class*=circle_changing]");
        cy.wrap(el).contains("head");
      }
      if (index === 1) {
        cy.wrap(el).find("[class*=circle_small]").contains("12");
      }
    });
    cy.wait(500);
    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 1) {
        cy.wrap(el).find("[class*=circle_changing]");
      }
      if (index === 2) {
        cy.wrap(el).find("[class*=circle_small]").contains("12");
      }
    });
    cy.wait(500);

    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 2) {
        cy.wrap(el).find("[class*=circle_modified]").contains("12");
      }
    });
    cy.wait(500);
    cy.get(currentСircleWithSettings)
      .should("have.length", 5)
      .each((el, index) => {
        if (index === 2) {
          cy.wrap(el).find("[class*=circle_default]").contains("12");
        }
      });
  });

  it("Checking deleting an element by index", () => {
    const endArray = ["0", "34", "1"];

    cy.get("input").eq(1).type(2);
    cy.get("button").eq(6).click();
    cy.wait(500);
    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 0) {
        cy.wrap(el).find("[class*=circle_changing]").contains("0");
      }
    });
    cy.wait(500);
    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 1) {
        cy.wrap(el).find("[class*=circle_changing]").contains("34");
      }
    });
    cy.wait(500);
    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 2) {
        cy.wrap(el).find("[class*=circle_changing]").contains("8");
      }
    });

    cy.wait(500);
    cy.get(currentСircleWithSettings).each((el, index) => {
      if (index === 2) {
        cy.wrap(el).find("[class*=circle_small]");
      }
    });

    cy.wait(500);
    cy.get(currentСircleWithSettings)
      .should("have.length", 3)
      .each((el, index) => {
        cy.get(el).contains(endArray[index]);
        cy.wrap(el).find("[class*=circle_default]");
      });
  });
});
