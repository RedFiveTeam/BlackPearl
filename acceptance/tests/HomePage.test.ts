/// <reference path="../steps.d.ts" />
let assert = require('assert');

Feature('Home Page');

Scenario('should allow the user to add, edit and delete a resource', (I) => {
  let name = 'TestPage' + Date.now();

  //create
  I.amOnPage('/');
  I.click('Add Resource');
  I.fillField('.titleField', name);
  I.fillField('.urlField', 'https://www.testpage.com');
  I.click('SAVE', '.modal');
  I.waitForText(name, 10);

  //edit
  I.amOnPage('/');
  I.waitForElement('.threeDotButton' + `.${name}`, 10);
  I.click('.threeDotButton' + `.${name}`);
  I.click('.editButton');
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
  I.waitForElement('.threeDotButton' + `.${name}`, 10);
  I.click('.threeDotButton' + `.${name}`);
  I.click('.deleteButton');
  I.see(name);
  I.click('DELETE');
  I.wait(1);
  I.dontSee(name);
});

Scenario('should see an ATO day', (I) => {
  I.amOnPage('/');
  I.see("ATO ", ".atoDay");
});

Scenario('should validate user resource input', async (I) => {
  //empty
  I.amOnPage('/');
  I.click('Add Resource');
  I.click('SAVE', '.modal');
  I.waitForText('Please enter a title', 10);
  I.waitForText('Please enter an address', 10);
  I.click('CANCEL', '.modal');
  //tooLong
  I.click('Add Resource');
  let superLongTitle = 'This string is waaaaaaay too long to possible be a title. what am i even doing????? Whyyyyyyyy';
  I.fillField('.titleField', superLongTitle);
  let title = await I.grabValueFrom('.titleField');
  assert.strictEqual(title.length, 64);
  let validTitle = "This is a pretty decent title";
  I.fillField('.titleField', validTitle);
  title = await I.grabValueFrom('.titleField');
  assert.strictEqual(title, validTitle);
  //invalid url
  I.fillField('.urlField', 'sometrash.com');
  I.click('SAVE', '.modal');
  I.waitForText('Please enter a valid address (https://www...)');
});

Scenario('should render six clocks', async function (I) {
  I.amOnPage('/');
  I.waitForElement('.clock', 10);
  const clockCount = await I.grabNumberOfVisibleElements('.clock');
  assert.strictEqual(clockCount, 6);
});

Scenario('should render three unique cards', (I) => {
  I.amOnPage('/');
  I.see("Main", ".cardTitle");
  I.see("Situational Awareness", ".cardTitle");
  I.see("Target Research", ".cardTitle");
  I.see("Google", ".category1 .resource");
  I.see("YouTube", ".category2 .resource");
  I.see("Reddit", ".category3 .resource");
});

Scenario('should display and then hide edit & delete buttons for resources', (I) => {
  let name = 'TestPage' + Date.now();

  //create
  I.amOnPage('/');
  I.click('Add Resource');
  I.fillField('.titleField', name);
  I.fillField('.urlField', 'https://www.testpage.com');
  I.click('SAVE', '.modal');
  I.waitForText(name, 10);

  //show and hide
  I.amOnPage('/');
  I.click('.threeDotButton' + `.${name}`);
  I.waitForElement('.editButton', 10);
  I.click('.bannerTitle');
  I.dontSee('.editButton');
});

Scenario('should display a list of acronyms', (I) => {
  I.amOnPage('/');
  I.fillField('.acronymSearch', 'AAM');
  I.waitForText("AAM - air-to-air missile", 10, ".acronym");
});

Scenario('should allow users to convert coordinates', async (I) => {
  I.amOnPage('/');
  I.waitForElement('.latLongInput', 10);
  I.fillField('.latLongInput', '37° 8\'1.97"N 76° 6\'30.23"W');
  let mgrsValue = await I.grabValueFrom('.mgrsInput');
  assert.strictEqual(mgrsValue, '18SVG0155110299');
  I.fillField('.mgrsInput', '18SVG0493917349');
  let latLongValue = await I.grabValueFrom('.latLongInput');
  assert.strictEqual(latLongValue, '371152N 0760416W');
});