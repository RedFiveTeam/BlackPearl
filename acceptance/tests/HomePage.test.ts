/// <reference path="../steps.d.ts" />

let assert = require('assert');

Feature('Home Page');

Scenario('should allow the user to add and delete a resource', (I) => {
  let name = 'TestPage' + Date.now();
  I.amOnPage('/');
  I.click('ADD RESOURCE');
  I.fillField('.titleField', name);
  I.fillField('.urlField', 'https://www.testpage.com');
  I.click('SAVE', '.modal');
  I.waitForText(name, 10);

  I.click('.deleteButton' + `.${name}`);
  I.see(name);
  I.click('CONFIRM');
  I.wait(1);
  I.dontSee(name);
});

Scenario('should see an ATO day', (I) => {
  I.amOnPage('/');
  I.see("ATO ", ".atoDay");
});

Scenario('should render two clocks', async function (I) {
  I.amOnPage('/');
  const clockCount = await I.grabNumberOfVisibleElements('.clock');
  assert.equal(clockCount, 2);
});