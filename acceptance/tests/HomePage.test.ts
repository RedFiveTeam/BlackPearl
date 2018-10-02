/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario('should display working links', (I) => {
  I.amOnPage('/');
  I.wait(1);
  I.see('Google');
  I.click('Google');
  I.wait(1);
  I.amOnPage('https://www.google.com');
});