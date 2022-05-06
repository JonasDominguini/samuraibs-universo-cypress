import faker from "@faker-js/faker";
import signupPage from "../support/pages/signup/";

describe("Cadastro", function () {
  before(function () {
    cy.fixture("signup").then(function (signup) {
      this.success = signup.success;
      this.email_dup = signup.email_dup;
      this.email_inv = signup.email_inv;
      this.short_password = signup.short_password;
    });
  });

  context("Quando o usuário é novato", function () {
    before(function () {
      cy.task("removeUser", this.success.email).then(function (result) {
        console.log(result);
      });
    });

    it("Deve cadastrar com sucesso", function () {
      signupPage.go();
      signupPage.form(this.success);
      signupPage.submit();
      signupPage.toast.shouldtHaveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("Quando o email já existe", function () {
    before(function () {
      cy.postUser(this.email_dup);
    });

    it("Deve exibir email já cadastrado", function () {
      signupPage.go();
      signupPage.form(this.email_dup);
      signupPage.toast.shouldtHaveText(
        "Email já cadastrado para outro usuário."
      );
      
    });
  });

  context("Quando email está incorreto", function () {
    it("Deve exibir mensagem de alerta", function () {
      signupPage.go();
      signupPage.form(this.email_inv);
      signupPage.submit();
      signupPage.alertHaveText("Informe um email válido");
    });
  });

  context("Quando a senha é muito curta", function () {
    const password = ["1", "2a", "3a$", "abc4", "ab#c5", ];

    beforeEach(function () {
      signupPage.go();
    });

    password.forEach(function (p) {
      it("Não deve cadastrar com a senha: " + p, function () {
        this.short_password.password = p;

        signupPage.form(this.short_password);
        signupPage.submit();
      });
    });
    afterEach(function () {
      signupPage.alertHaveText("Pelo menos 6 caracteres");
    });
  });

  context("Quando não preencho nenhum campo", () => {
    const alertMensagens = [
      "Nome é obrigatório",
      "E-mail é obrigatório",
      "Senha é obrigatória",
    ];
    before(() => {
      signupPage.go();
      signupPage.submit();
    });

    alertMensagens.forEach((alert) => {
      it("Deve exibir " + alert.toLowerCase(), () => {
        signupPage.alertHaveText(alert);
      });
    });
  });
});
