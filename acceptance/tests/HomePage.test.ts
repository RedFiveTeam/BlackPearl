/// <reference path="../steps.d.ts" />
let homeAssert = require('assert');

Feature('Home Page');


Scenario('should allow users to convert coordinates', async (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/');
  I.waitForElement('.latLongInput', 10);
  I.fillField('.latLongInput', '37° 8\'1.97"N 76° 6\'30.23"W');
  let mgrsValue = await I.grabValueFrom('.mgrsInput');
  homeAssert.strictEqual(mgrsValue, '18SVG0155110299');
  I.fillField('.mgrsInput', '18SVG0493917349');
  let latLongValue = await I.grabValueFrom('.latLongInput');
  homeAssert.strictEqual(latLongValue, '371152N 0760416W');
});

Scenario('should display a list of acronyms', (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/');
  I.fillField('.acronymSearch', 'AAM');
  I.waitForText("AAM - air-to-air missile", 10, ".acronym");
});

Scenario('should see 4 weather links', async (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/');
  I.waitForElement('.weatherURL', 10);
  let weatherCount = await I.grabNumberOfVisibleElements('.weatherURL');
  homeAssert.strictEqual(weatherCount, 4);
});

Scenario('should convert measurements', async (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/');
  I.click('.bannerBurger');
  I.waitForText('Measurement Converter', 10);
  I.fillField('.conversionInput', '1');
  let value = await I.grabValueFrom('.conversionOutput');
  homeAssert.strictEqual(value, '0.62');
  I.click('KM');
  I.click('.ddd:first-of-type');
  value = await I.grabValueFrom('.conversionOutput');
  homeAssert.strictEqual(value, '1.15');
});

Scenario('should see an ATO day', (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/');
  I.see("ATO ", ".atoDay");
});

Scenario('should render six clocks', async function (I) {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/');
  I.waitForElement('.clock', 10);
  const clockCount = await I.grabNumberOfVisibleElements('.clock');
  homeAssert.strictEqual(clockCount, 6);
});

Scenario('should see a general information card', (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/');
  I.waitForElement('.info', 10);
  I.see('Image Server', '.info');
  I.see('Call Out Format', '.info');
  I.see('Image Server (JWICS)', '.info');
  I.see('AUAB', '.info');
  I.see('NAVCENT', '.info');
  I.see('DSN', '.info');
  I.see('SVOIP', '.info');
  I.see('TSVOIP', '.info');
});

Scenario('should allow the user to add, edit and delete an operation', async (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  let name = 't' + Date.now().toString().substr(8);

  //create
  I.amOnPage('/');
  I.click('.addOperationButton');
  I.fillField('.titleField', name);
  I.fillField('.descriptionField', 'This is my Op');
  I.fillField('.addressField', 'https://www.google.com');
  I.click('SAVE', '.modal');
  I.waitForText('Operation Added', 10);
  I.waitForText(name, 10);

  //edit
  I.amOnPage('/');
  I.click('.editButton', '.operation:last-of-type');
  I.fillField('.pendingEditTitle', name);
  I.fillField('.pendingEditDescription', 'This is my newly revised Op');
  I.fillField('.pendingEditAddress', 'https://www.mynewop.com');
  I.click('SAVE');
  I.waitForText('Operation Edit Complete', 10);
  I.waitForText(name, 10);
  I.waitForText('This is my newly revised Op', 10);
  const href = await I.grabAttributeFrom('.operation:last-of-type > a', 'href');
  homeAssert.strictEqual('https://www.mynewop.com', href);

  //delete
  I.amOnPage('/');
  I.click('.deleteButton', '.operation:last-of-type');
  I.see(name);
  I.click('DELETE');
  I.waitForText('Operation Deleted', 10);
  I.dontSee(name);
});

Scenario('should see a toast when clicking element in general info card', (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/');
  I.click('.row:first-of-type > div:first-of-type');
  I.waitForElement('.customToast', 10);
});

Scenario('should be able to search resources', (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/');
  I.fillField('.filterSection > input', 'Amazon');
  I.dontSee('YouTube');
  I.see(' Amazon');
});

Scenario('should render three unique cards', (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/');
  I.click('.tab:nth-of-type(1) > div', '.tabContainer');
  I.waitForText("Main", 10);
  I.see("Main", ".cardTitle");
  I.see("Situational Awareness", ".cardTitle");
  I.see("Target Research", ".cardTitle");
  I.see("Google", ".category1 .resource");
  I.see("YouTube", ".category2 .resource");
  I.see("Reddit", ".category3 .resource");
});

Scenario('should allow the user to change tabs and see specialty resources', (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/');
  I.click('.tab:nth-of-type(1) > div', '.tabContainer');
  I.see('FMV Amazon');
  I.see('FMV YouTube');
  I.see('FMV Reddit');

  I.click('.tab:nth-of-type(2) > div', '.tabContainer');
  I.see('HA Amazon');
  I.see('HA YouTube');
  I.see('HA Reddit');

  I.click('.tab:nth-of-type(3) > div', '.tabContainer');
  I.see('Fusion Amazon');
  I.see('Fusion YouTube');
  I.see('Fusion Reddit');
});

Scenario('should allow the user to add a local resource', async (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  let name = 't' + Date.now().toString().substr(8);
  //create
  I.amOnPage('/');
  I.selectOption('.sortSelector', 'Newest'); // This test hates life if this line isn't here
  I.click('ADD RESOURCE');
  I.fillField('.titleField', name);
  I.fillField('.urlField', 'Y:/TestFile.txt');
  I.click('SAVE', '.modal');
  I.waitForText('Resource Link Added', 10);
  const title = await I.grabAttributeFrom('.resource:nth-of-type(1) > .resourceLink', 'title');
  homeAssert.strictEqual(title, name);

  //click
  I.click(name);
  I.waitForText('Local Path Copied to Clipboard', 10);

  //delete
  I.amOnPage('/');
  I.click('.deleteButton');
  I.see(name);
  I.click('.confirmButton');
  I.waitForText('Resource Link Deleted', 10);
  I.dontSee(name);
});

Scenario('should allow the user to add, edit and delete a resource', async (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  let name = 't' + Date.now().toString().substr(8);

  //create
  I.amOnPage('/');
  I.click('.tab:nth-of-type(1) > div', '.tabContainer');
  I.click('ADD RESOURCE');
  I.fillField('.titleField', name);
  I.fillField('.urlField', 'https://www.testpage.com');
  I.click('SAVE', '.modal');
  I.waitForText('Resource Link Added', 10);
  I.waitForText(name, 10);

  //edit
  I.amOnPage('/');
  I.click('.tab:nth-of-type(1) > div', '.tabContainer');
  I.click('.editButton');
  I.fillField('.pendingEditTitle', name);
  I.fillField('.pendingEditUrl', 'https://www.google.com');
  I.click('SAVE');
  I.waitForText('Resource Edit Complete', 10);
  I.waitForText(name, 10);
  const href = await I.grabAttributeFrom('.category1 > .body > .resourceList > div:nth-of-type(5) > div > a', 'href');
  homeAssert.strictEqual('https://www.google.com', href);

  //delete
  I.amOnPage('/');
  I.click('.tab:nth-of-type(1) > div', '.tabContainer');
  I.click('.deleteButton');
  I.see(name);
  I.click('.confirmButton');
  I.waitForText('Resource Link Deleted', 10);
  I.dontSee(name);
});

Scenario('should validate user resource input', async (I) => {
  //empty
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/');
  I.click('ADD RESOURCE');
  I.click('SAVE', '.modal');
  I.waitForText('Please enter a title', 10);
  I.waitForText('Please enter an address', 10);
  I.click('CANCEL', '.modal');
  //too long
  I.click('ADD RESOURCE');
  let superLongTitle = 'This string is waaaaaaay too long to possibly be a title. what am i even doing????? Whyyyyyyyy';
  I.fillField('.titleField', superLongTitle);
  let title = await I.grabValueFrom('.titleField');
  homeAssert.strictEqual(title.length, 64);
  let validTitle = "This is a pretty decent title";
  I.fillField('.titleField', validTitle);
  title = await I.grabValueFrom('.titleField');
  homeAssert.strictEqual(title, validTitle);
  //invalid url
  I.fillField('.urlField', 'sometrash.com');
  I.click('SAVE', '.modal');
  I.waitForText('Please enter a valid address (https://www...)');
});

Scenario('should order by most clicked', async (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  let name = 't' + Date.now().toString().substr(8);

  //create
  I.amOnPage('/');
  I.click('.tab:nth-of-type(1) > div', '.tabContainer');
  I.click('ADD RESOURCE');
  I.fillField('.titleField', name);
  I.fillField('.urlField', 'Y:/Resource1');
  I.click('SAVE', '.modal');
  I.waitForText('Resource Link Added', 10);
  I.waitForText(name, 10);

  //create
  I.click('ADD RESOURCE');
  I.fillField('.titleField', name + '2');
  I.fillField('.urlField', 'Y:/Resource2');
  I.click('SAVE', '.modal');
  I.waitForText('Resource Link Added', 10);
  I.waitForText(name + '2', 10);

  I.selectOption('.sortSelector', 'Most Clicked');

  I.click(name + '2');
  I.click(name + '2');
  I.click(name + '2');

  I.refreshPage();
  I.wait(2);
  let title = await I.grabAttributeFrom('.category1 > .body > .resourceList > div:last-of-type > div > a', 'href');
  homeAssert.strictEqual(title, 'Y:/Resource1');

  //delete
  I.click('.deleteButton', '.resourceList > div:first-of-type');
  I.click('.confirmButton');
  I.click('.deleteButton', '.resourceList > div:last-of-type');
  I.click('.confirmButton');
  I.dontSee(name);
  I.dontSee(name + '2');
});
