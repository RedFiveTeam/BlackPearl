/// <reference path="../steps.d.ts" />
Feature('Metrics Page');

Before((I) => {
  I.amOnPage('/');
  I.fillField('.username', 'jordan');
  I.fillField('password', 'password');
  I.click('Login');
  I.waitForText('Jordan', 10);
});

Scenario('should show the user metrics information', (I) => {
  I.amOnPage('/metrics');

  I.waitForText('Total User Accounts', 10);
  I.waitForText('Total Visits', 3);
  I.waitForText('Time Frame:', 10);
  I.seeElement('.exportButton');
});