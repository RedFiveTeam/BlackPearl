/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario('should display working links', (I) => {
  I.amOnPage('/');
  I.wait(1); // Wait for DB to load
  I.see('Google', '.resource');
  I.click('Google', '.resource');
  I.wait(1); // Wait for tab to open
  I.switchToNextTab();
  I.seeInCurrentUrl("google");
});

Scenario('should allow the user to add a resource', (I) => {
  I.amOnPage('/');
  I.click('ADD RESOURCE');
  I.fillField('.titleField', 'Test Page');
  I.fillField('.urlField', 'https://www.testpage.com');
  I.click('SAVE', '.modal');
  I.see('Test Page', '.resource');
});