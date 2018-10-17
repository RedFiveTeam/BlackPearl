/// <reference path="../steps.d.ts" />

let assert = require('assert');

Feature('Home Page');

Scenario('should allow the user to add, edit and delete a resource', (I) => {
  let name = 'TestPage' + Date.now();

  //create
  I.amOnPage('/');
  I.click('ADD RESOURCE');
  I.fillField('.titleField', name);
  I.fillField('.urlField', 'https://www.testpage.com');
  I.click('SAVE', '.modal');
  I.waitForText(name, 10);

  //edit
  I.amOnPage('/');
  I.click('.editButton' + `.${name}`);
  I.fillField('.pendingEditTitle', name);
  I.fillField('.pendingEditUrl', 'https://www.google.com');
  I.click('SAVE');
  I.wait(1);
  I.waitForText(name, 10);
  I.click(name);
  I.switchToNextTab();
  I.seeInCurrentUrl('google');
  I.closeCurrentTab();
  I.amOnPage('/');

  //delete
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
//
// Scenario('should allow update of a resource', (I) => {
//   let name = 'TestPage' + Date.now();
//   I.amOnPage('/');
//   I.click('.editButton' + `.${name}`);
//   I.fillField('.titleField', name);
//   I.fillField('.urlField', 'https://www.changed.org');
//   I.click('CONFIRM');
//   I.waitForText(name, 10);
//   I.click(name);
//   I.amOnPage('https://www.changed.org');
// });