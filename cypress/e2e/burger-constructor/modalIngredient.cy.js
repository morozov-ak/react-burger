describe("ingredient popup open", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("should open burger constructor page by default", () => {
    cy.contains("Соберите бургер");
  });

  it("should open and close popup by click", () => {
    cy.get("#ingredient").contains("Краторная булка N-200i").click();
    cy.contains("Детали ингредиента");
    cy.get("#modal").find("button").click();
  });
});
