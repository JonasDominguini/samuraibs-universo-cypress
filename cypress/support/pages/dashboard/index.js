import header from "../../components/header";
import { el } from "./elements";
class DashPage {
  constructor() {
    this.header = header;
  }

  calendarShoulBeVisible() {
    cy.get(".DayPicker", { timeout: 9000 }).should("be.visible");
  }
  selectDay(day) {
    const target = new RegExp("^" + day + "$", "g");
    cy.contains(".DayPicker-Day--available", target).click({force:true});
  }

  appointmentShouldBe(customer, hour) {
    cy.contains("div", customer.name)
      .should("be.visible")
      .parent()
      .contains('span[class="appointment"]', hour)
      .should("be.visible");
  }
}

export default new DashPage();
