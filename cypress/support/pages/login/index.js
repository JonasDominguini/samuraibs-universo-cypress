import { el } from "./elements";
import toast from "../../components/toast";

class LoginPage {
  constructor() {
    this.toast = toast;
  }

  go() {
    cy.visit("/");
    cy.contains(el.title).should("be.visible"); // isso é um checkpoint, para verificar se está de fato na página que eu queria. Boas praticas.
  }

  form(user) {
    //cy.get(el.name).clear().type(user.name);
    cy.get(el.email).clear().type(user.email);
    cy.get(el.password).clear().type(user.password);
  }
  submit() {
    cy.contains(el.signButton).click();
  }

  alertHaveText(expectText) {
    cy.contains(el.alertError, expectText).should("be.visible");
  }
}

export default new LoginPage();
