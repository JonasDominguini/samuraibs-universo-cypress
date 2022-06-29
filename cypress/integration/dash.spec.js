const {
  getCypressElementCoordinates,
} = require("cypress-real-events/getCypressElementCoordinates");

import loginPage from "../support/pages/login";
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
      loginPage.go();
      loginPage.form(provider);
      loginPage.submit();
      dashPage.calendarShoulBeVisible();

      const day = Cypress.env("appointmentDay");
      dashPage.selectDay(day);
      dashPage.appointmentShouldBe(customer, appointment.hour);
    });
  });
});

import moment from "moment";

Cypress.Commands.add("setProviderId", function (providerEmail) {
  cy.request({
    method: "GET",
    url: "http://localhost:3333/providers",
    headers: {
      authorization: "Bearer " + Cypress.env("apiToken"),
    },
  }).then(function (response) {
    expect(response.status).to.eq(200);
    console.log(response.body);

    const providerlist = response.body;

    providerlist.forEach(function (provider) {
      if (provider.email === providerEmail)
        Cypress.env("providerId", provider.id);
    });
  });
});

Cypress.Commands.add("createAppointment", function (hour) {
  let now = new Date();
  now.setDate(now.getDate() + 1);

  Cypress.env("appointmentDay", now.getDate());

  const date = moment(now).format("YYYY-MM-DD " + hour);

  const payload = {
    provider_id: Cypress.env("providerId"),
    date: date,
  };
  cy.request({
    method: "POST",
    url: "http://localhost:3333/appointments",
    body: payload,
    headers: {
      authorization: "Bearer " + Cypress.env("apiToken"),
    },
    failOnStatusCode: false,
  }).then(function (response) {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add("apiLogin", function (user) {
  const payload = {
    email: user.email,
    password: user.password,
  };
  cy.request({
    method: "POST",
    url: "http://localhost:3333/sessions",
    body: payload,
  }).then(function (response) {
    expect(response.status).to.eq(200);
    Cypress.env("apiToken", response.body.token);
  });
});
