import faker from "@faker-js/faker";
import signupPage from "../support/pages/signup/";

describe("Cadastro", () => {
  context("Quando o usuário é novato", () => {
    const user = {
      name: "Jonas Dominguini",
      email: "jonas@samuraibs.com",
      password: "pwd123",
    };

    before(function () {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });
    });

    it("Deve cadastrar com sucesso", () => {
      signupPage.go();
      signupPage.form(user);
      signupPage.submit();
      signupPage.toast.shouldtHaveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("Quando o email já existe", () => {
    const user = {
      name: "João Lucas",
      email: "joão@samuraibs.com",
      password: "pwd123",
      is_provider: true,
    };
    before(function () {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });

      cy.request("POST", "http://localhost:3333/users", user).then(function (
        response
      ) {
        expect(response.status).to.eq(200);
      });
    });

    it("Deve exibir email já cadastrado", () => {
      cy.visit("/signup");
      cy.get('input[placeholder^="Nome"]').type(user.name);
      cy.get('input[placeholder$="email"]').type(user.email);
      cy.get('input[placeholder*="senha"]').type(user.password);
      cy.contains("button", "Cadastrar").click();

      cy.get(".toast")
        .should("be.visible")
        .find("p")
        .should("have.text", "Email já cadastrado para outro usuário.");
    });
  });

  context("Quando email está incorreto", () => {
    const user = {
      name: "Elizabeth Olsen",
      email: "liza.yahoo.com",
      password: "pwd123",
    };

    it("Deve exibir mensagem de alerta", () => {
      signupPage.go();
      signupPage.form(user);
      signupPage.submit();
      signupPage.alertHaveText("Informe um email válido");
    });
  });

  context("Quando a senha é muito curta", () => {
    const password = ["1", "2a", "3a$", "abc4", "ab#c5", "adf7*6"];

    beforeEach(() => {
      signupPage.go();
    });

    password.forEach(function (p) {
      it("Não deve cadastrar com a senha: " + p, function () {
        const user = {
          name: "Janson Friday",
          email: "jason@gamil.com",
          password: p,
        };

        signupPage.form(user);
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
