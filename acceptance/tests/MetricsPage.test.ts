/// <reference path="../steps.d.ts" />
Feature('Metrics Page');

Scenario('should show the user the number of user accounts', (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/metrics');
  I.waitForText('Total User Accounts', 10);
});

Scenario('should show the user the number of logins', (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/metrics');
  I.waitForText('Total Visits', 3);
  I.seeElement('.exportButton');
});