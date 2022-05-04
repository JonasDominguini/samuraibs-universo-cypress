import loginPage from "../support/pages/login";
import dashPage from "../support/pages/dashboard";
import login from "../support/pages/login";

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

  context("Quando usuário é bom mas a senha é está incorreta", () => {
    let user = {
      name: "Celso Kamura",
      email: "kamura@samuraibs.com",
      password: "pwd123",
      is_provider: true,
    };

    before(function () {
      cy.postUser(user).then(function () {
        user.password = "abc123";
      });
    });

    it("Deve notificar o erro de credenciais", () => {
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais.";
      loginPage.toast.shouldtHaveText(message);
    });
  });

  context("Quando o formato do email é invalido", () => {
    const emails = [
      "papito.com.br",
      "hotmail.com",
      "@",
      "papito@",
      "111",
      "&*^&^&*",
      "xpyo123",
    ];

    before(() => {
      loginPage.go();
    });

    emails.forEach(function (email) {
      it("Não deve logar com email:" + email, () => {
        const user = { email: email, password: "pwd123" };

        loginPage.form(user);
        loginPage.submit();
        loginPage.alertHaveText("Informe um email válido");
      });
    });
    // observação que o teste foi mudado, para não ficar abrindop e fechando o navegador. NA aula 67 fala sobre isso ver
  });

  context("Quando não preencho nenhum dos campos", () => {
    const alertMensagens = ["E-mail é obrigatório", "Senha é obrigatória"];
    before(() => {
      loginPage.go();
      loginPage.submit();
    });

    alertMensagens.forEach((alert) => {
      it("Deve exibir " + alert.toLowerCase(), () => {
        loginPage.alertHaveText(alert);
      });
    });
  });
});
