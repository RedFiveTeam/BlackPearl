/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario('should display working links', (I) => {
  I.amOnPage('/');
  I.waitForElement('.resource', 10);
  I.see('Google', '.resource');
  I.click('Google', '.resource');
  I.switchToNextTab();
  I.seeInCurrentUrl("google");
});

Scenario('should allow the user to add a resource', (I) => {
  let title = 'Test Page' + Date.now();
  I.amOnPage('/');
  I.click('ADD RESOURCE');
  I.fillField('.titleField', title);
  I.fillField('.urlField', 'https://www.testpage.com');
  I.click('SAVE', '.modal');
  I.waitForText(title, 10);
});