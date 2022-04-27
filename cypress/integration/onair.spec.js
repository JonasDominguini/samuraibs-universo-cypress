it("webapp deve estar online", () => {
  // um simples comentário
  cy.visit("/");
  cy.title().should("eq", "Samurai Barbershop by QAninja");
});
/*
$ cd /c/UniversoCypress/samuraibs/apps/api
Isso para abrir a api
$ cd /c/UniversoCypress/samuraibs/apps/web

*/
