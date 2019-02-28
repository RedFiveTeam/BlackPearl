/// <reference path="../steps.d.ts" />

Feature('Error Page');

Before((I) => {
  I.amOnPage('/');
  I.fillField('.username', 'jordan');
  I.fillField('password', 'password');
  I.click('Login');
  I.waitForText('Jordan', 10);
});

Scenario('should show a 404 page', async (I) => {
  I.amOnPage('/ehbrewhjrbewewrfr');
  I.see("Lost at Sea?");
});