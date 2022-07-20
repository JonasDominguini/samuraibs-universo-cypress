import dashPage from "../support/pages/dashboard";

import { customer, provider, appointment } from "../support/factories/dash";
describe("dashboard", function () {
  context("Quando o cliente faz um agendamento no app mobile", function () {
    before(function () {
      cy.postUser(provider);
      cy.postUser(customer);

      cy.apiLogin(customer);
      cy.log("Conseguimos pegar o token " + Cypress.env("apiToken"));
      cy.setProviderId(provider.email);
      cy.createAppointment(appointment.hour);
    });
    it("O mesmo deve ser exibido no dashboard", function () {
      const date = Cypress.env("appointmentDate");

      cy.apiLogin(provider, true);
      //cy.uiLogin(provider);

      dashPage.calendarShoulBeVisible();
      dashPage.selectDay(date);
      dashPage.appointmentShouldBe(customer, appointment.hour);
    });
  });
});
