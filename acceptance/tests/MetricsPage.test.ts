/// <reference path="../steps.d.ts" />
Feature('Metrics Page');

Scenario('should show the user metrics information', (I) => {
  I.amOnPage('/metrics');
  I.waitForText('Total User Accounts', 10);
  I.waitForText('Total Visits', 3);
  I.seeElement('.exportButton');
});