describe("check accessability", () => {
  it("should oppening on localhost:3000", () => {
    cy.visit("http://localhost:3000");
  });
});
