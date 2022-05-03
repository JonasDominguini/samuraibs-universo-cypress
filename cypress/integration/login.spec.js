import loginPage from "../support/pages/login";
import dashPage from "../support/pages/dashboard";

describe("Login", () => {
  context("Quando usuário é muito bom ", () => {
    const user = {
      name: "Robson Jassa",
      email: "jassa@samuraibs.com",
      password: "pwd123",
      is_provider: true,
    };

    before(() => {
      cy.postUser(user);
    });

    it("Deve logar com sucesso", () => {
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();
      dashPage.header.userLoggedIn(user.name);
    });
  });
});
