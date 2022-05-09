import fpPage from "../support/pages/forgotpass";

describe("resgate de senha ", function () {
  before(function () {
    cy.fixture("recovery").then(function (recovery) {
      this.data = recovery;
    });
  });

  context("Quando usuário esquece a senha ", function () {
    before(function () {
      cy.postUser(this.data);
    });
    it("deve poder resgatar a senha por email", function () {
      fpPage.go();
      fpPage.form(this.data.email);
      fpPage.submit();
      const message =
        "Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.";
      fpPage.toast.shouldtHaveText(message);
    });
  });
  context.only("Quando usuário solicita o resgate", function () {
    before(function () {
      cy.postUser(this.data);
      cy.recoveryPass(this.data.email);
    });
    it("Deve poder cadastrar uma nova senha ", function () {
      cy.task("findToken", this.data.email).then(function (result) {
        console.log(result);
      });
    });
  });
});
