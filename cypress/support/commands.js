// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add("callWindowF2", () => {
  cy.get("body").trigger("keyup", { keyCode: 113, which: 113, key: "F2" });
});
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { apiServer } from "../../cypress.json";

Cypress.Commands.add("postUser", function (user) {
  cy.task("removeUser", user.email).then(function (result) {
    console.log(result);
  });

  cy.request({ method: "POST", url: apiServer + "/users", body: user }).then(
    function (response) {
      expect(response.status).to.eq(200);
    }
  );
});

Cypress.Commands.add("recoveryPass", function (email) {
  cy.request({
    method: "POST",
    url: apiServer + "/password/forgot",
    body: {
      email: email,
    },
  }).then(function (response) {
    expect(response.status).to.eq(204);

    cy.task("findToken", email).then(function (result) {
      Cypress.env("recoveryToken", result.token);
    });
  });
});
