/// <reference path="../steps.d.ts" />
Feature('Metrics Page');

Scenario('should show the user the number of user accounts', (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5OjE=');
  I.amOnPage('/metrics');
  I.waitForText('Total user accounts: 3', 10);
});

Scenario('should show the user the number of logins', (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5OjE=');
  I.amOnPage('/metrics');
  I.waitForText('Total Visits:', 3);
  I.seeElement('.exportLoginsButton');
});