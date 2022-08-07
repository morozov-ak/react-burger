describe("create order", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000");
  });

  it("should open burger constructor page by default", () => {
    cy.contains("Соберите бургер");
  });

  it("should not accept incorrect ingredients", () => {
    cy.get("a#ingredient")
      .contains("Краторная булка N-200i")
      .trigger("dragstart");

    cy.get("div#dropTargetFill").trigger("drop", { force: true });

    cy.get("a#ingredient").contains("Spicy").trigger("dragstart");

    cy.get("div#dropTargetBun").trigger("drop", { force: true });

    cy.get("section#constructor").contains("Выберите начинку");
  });

  it("should not accept incorrect ingredients", () => {
    cy.get("a#ingredient")
      .contains("Краторная булка N-200i")
      .trigger("dragstart");

    cy.get("div#dropTargetBun").trigger("drop", { force: true });

    cy.get("a#ingredient").contains("Spicy").trigger("dragstart");

    cy.get("div#dropTargetFill").trigger("drop", { force: true });

    cy.get("a#ingredient").contains("Protostomia").trigger("dragstart");

    cy.get("div#dropTargetFill").trigger("drop", { force: true });

    cy.get("section#constructor").contains("Краторная булка N-200i");
    cy.get("section#constructor").contains("Spicy");
    cy.get("section#constructor").contains("Protostomia");
  });

  it("should open prifile and login", () => {
    cy.contains("Личный кабинет");
    cy.get("a > p").contains("Личный кабинет").click();
    cy.get("input[name=email]").type("mr.morozov_ak@mail.ru");
    cy.get("input[name=password]").type("qweqwe");
    cy.get("button").contains("Войти").click();
    cy.contains("В этом разделе вы можете изменить свои персональные данные");
  });

  it("should make order", () => {
    cy.contains("Личный кабинет");
    cy.get("a > p").contains("Личный кабинет").click();
    cy.get("input[name=email]").type("mr.morozov_ak@mail.ru");
    cy.get("input[name=password]").type("qweqwe");
    cy.get("button").contains("Войти").click();
    cy.contains("В этом разделе вы можете изменить свои персональные данные");
    cy.get("a>p").contains("Конструктор").click();
    cy.get("a#ingredient")
      .contains("Краторная булка N-200i")
      .trigger("dragstart");

    cy.get("div#dropTargetBun").trigger("drop", { force: true });
    cy.get("button").contains("Оформить заказ").click();
    cy.wait(15000);
    cy.contains("идентификатор заказа");
    cy.get("#modal").find("button").click();
    cy.contains("идентификатор заказа").should("have.length", 0);
  });
});
