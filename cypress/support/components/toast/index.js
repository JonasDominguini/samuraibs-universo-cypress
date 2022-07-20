import { el } from "./elements";

class Toast {
  shouldtHaveText(expectText) {
    cy.get(el.toast, { timeout: 10000 })// timeout que deixei, diferente do que manda em aula. Não quero os 30 s indicados como padrão.
      .should("be.visible")
      .should("have.css", "opacity", "1", { timeout: 2000 })
      .find("p")
      .should("have.text", expectText);
  }
}

export default new Toast();
