/// <reference path="../steps.d.ts" />
Feature('Metrics Page');

Scenario('should show the user the number of user accounts', (I) => {
    I.amOnPage('/metrics');
    I.waitForText('Total user accounts: 2', 10);
});