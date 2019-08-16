/// <reference path="../steps.d.ts" />

let homeAssert = require('assert');

Feature('Home Page');
/* tslint:disable:no-any */

Scenario('should provide a resource features set', async (I) => {
  await login(I);
  checkCards(I);
  await addResource(I);
  await editResource(I);
  await deleteResource(I);
  await sortResource(I);
  await searchResource(I);
});

Scenario('should provide functioning widgets', async (I) => {
  await login(I);
  await coordinateConverter(I);
  await measurementConverter(I);
  await acronymSearch(I);
});

Scenario('ops and general info journey', async (I) => {
  await login(I);

  checkForToast(I);
  checkGeneralInfo(I);

  addOperation(I);
  await editOperation(I);
  deleteOperation(I);
});

async function login(I) {
  I.amOnPage('/');
}

async function acronymSearch(I) {
  I.fillField('.acronymSearch', 'AAM');
  I.waitForText("AAM - air-to-air missile", 10, ".acronym");

  I.waitForElement('.weatherURL', 10);
  let weatherCount = await I.grabNumberOfVisibleElements('.weatherURL');
  homeAssert.strictEqual(
    weatherCount,
    4,
    'Widget should have 4 weather URLs'
  );
}

async function measurementConverter(I) {
  I.fillField('.conversionInput', '1');
  let value = await I.grabValueFrom('.conversionOutput');
  homeAssert.strictEqual(
    value,
    '0.62',
    'Widget should convert KM to miles by default'
  );

  I.click('KM');
  I.click('.ddd:first-of-type');
  value = await I.grabValueFrom('.conversionOutput');
  homeAssert.strictEqual(
    value,
    '1.15',
    'Widget should select NM and convert to miles'
  );
}

async function coordinateConverter(I) {
  I.waitForElement('.latLongInput', 10);
  I.fillField('.latLongInput', '37° 8\'1.97"N 76° 6\'30.23"W');
  let mgrsValue = await I.grabValueFrom('.mgrsInput');
  homeAssert.strictEqual(
    mgrsValue,
    '18SVG0155110299',
    'Widget should convert LatLong to MGRS'
  );

  I.fillField('.mgrsInput', '18SVG0493917349');
  let latLongValue = await I.grabValueFrom('.latLongInput');
  homeAssert.strictEqual(
    latLongValue,
    '371152N 0760416W',
    'Widget should convert MGRS to LatLong'
  );
}

function addOperation(I) {
  let name = 't' + Date.now().toString().substr(8);

  I.amOnPage('/');
  I.click('.addOperationButton');
  I.fillField('.titleField', name);
  I.fillField('.descriptionField', 'This is my Op');
  I.fillField('.addressField', 'https://www.google.com');
  I.click('SAVE', '.modal');
  I.waitForText('Operation Added', 10);
  I.waitForText(name, 10);
}

async function editOperation(I) {
  I.amOnPage('/');
  I.click('.editButton', '.operation:last-of-type');
  I.fillField('.pendingEditTitle', 'New Operation');
  I.fillField('.pendingEditDescription', 'This is my newly revised Op');
  I.fillField('.pendingEditAddress', 'https://www.mynewop.com');
  I.click('SAVE');
  I.waitForText('Operation Edit Complete', 10);
  I.waitForText('New Operation', 10);
  I.waitForText('This is my newly revised Op', 10);
  const href = await I.grabAttributeFrom('.operation:last-of-type > a', 'href');
  homeAssert.strictEqual('https://www.mynewop.com', href);
}

function deleteOperation(I) {
  I.amOnPage('/');
  I.click('.deleteButton', '.operation:last-of-type');
  I.see('New Operation');
  I.click('DELETE');
  I.waitForText('Operation Deleted', 10);
  I.dontSee('New Operation');
}

function checkForToast(I) {
  I.click('.row:first-of-type > div:first-of-type');
  I.waitForElement('.customToast', 10);
}

function checkGeneralInfo(I) {
  I.see('Image Server', '.info');
  I.see('Call Out Format', '.info');
  I.see('Image Server (JWICS)', '.info');
  I.see('AUAB', '.info');
  I.see('NAVCENT', '.info');
  I.see('DSN', '.info');
  I.see('SVOIP', '.info');
  I.see('TSVOIP', '.info');
}

function checkCards(I) {

  I.see("Main", ".cardTitle");
  I.click('.tab:nth-of-type(1) > div', '.tabContainer');
  I.see("Situational Awareness", ".cardTitle");

  I.click('.tab:nth-of-type(2) > div', '.tabContainer');
  I.see("Target Research", ".cardTitle");

  I.click('.tab:nth-of-type(3) > div', '.tabContainer');
}

async function addResource(I) {

  I.click('.addResourceButton:first-of-type');

  I.click('SAVE', '.modal');
  I.waitForText('Please enter a title', 10);
  I.waitForText('Please enter an address', 10);

  let superLongTitle = 'This string is waaaaaaay too long to possibly be a title. what am i even doing????? Whyyyyyyyy';
  I.fillField('.titleField', superLongTitle);
  let correctedTitle = await I.grabValueFrom('.titleField');
  homeAssert.strictEqual(
    correctedTitle.length,
    64,
    'Resource modal should shorten long titles'
  );

  const createValidTitle = 'new' + Date.now();
  I.fillField('.titleField', createValidTitle);
  correctedTitle = await I.grabValueFrom('.titleField');
  homeAssert.strictEqual(
    correctedTitle,
    createValidTitle,
    'Resource modal should keep valid titles'
  );
  I.fillField('.urlField', 'trash.com');
  I.click('SAVE', '.modal');
  I.waitForText('Please enter a valid address (https://www...)', 10);

  I.fillField('.urlField', `https://www.${createValidTitle}.com`);
  I.click('SAVE', '.modal');
  I.waitForText('Resource Link Added', 10);
  I.waitForText(createValidTitle, 10);
  const createdResourceURL =
    await I.grabAttributeFrom(
      locate('.resourceLink').withAttr({title: createValidTitle}),
      'href'
    );
  homeAssert.strictEqual(
    createdResourceURL,
    `https://www.${createValidTitle}.com`,
    'Resource created with correct URL'
  );

  const localResourceTitle = 'create local' + Date.now();
  I.click('.addResourceButton:first-of-type');
  I.fillField('.titleField', localResourceTitle);
  I.fillField('.urlField', 'Y:/TestFile.txt');
  I.click('SAVE', '.modal');
  I.waitForText('Resource Link Added', 10);

  const actualPath = await I.grabAttributeFrom(
    locate('.resourceLink').withText(localResourceTitle),
    'href'
  );
  homeAssert.strictEqual(
    actualPath,
    'Y:/TestFile.txt',
    'Resource should take local path'
  );
  I.click(localResourceTitle);
  I.waitForText('Local Path Copied to Clipboard', 10);
}

async function editResource(I) {
  const editTitle = 'edit' + Date.now();
  I.click('.editButton:first-of-type');
  I.fillField('.pendingEditTitle', editTitle);
  I.fillField('.pendingEditUrl', `https://www.${editTitle}.com`);
  I.click('SAVE');
  I.waitForText('Resource Edit Complete', 10);
  const editedUrl = await I.grabAttributeFrom(
    locate('.resourceLink').withAttr({title: editTitle}),
    'href'
  );
  homeAssert.strictEqual(
    editedUrl,
    `https://www.${editTitle}.com`,
    'Resource edited new URL'
  )
}

async function searchResource(I) {
  const beforeSearchResourceCount = await I.grabNumberOfVisibleElements('.resource');
  const beforeSearchTitle = await I.grabAttributeFrom('.resource:last-of-type  > .resourceLink', 'title');

  I.fillField('.filterSection > input', beforeSearchTitle);
  const afterSearchResourceCount = await I.grabNumberOfVisibleElements('.resource');
  const afterSearchTitle = await I.grabAttributeFrom('.resource:first-of-type > .resourceLink', 'title');

  homeAssert(
    afterSearchResourceCount < beforeSearchResourceCount,
    'Resource search should filter out non-matching resources'
  );
  homeAssert.strictEqual(
    afterSearchTitle,
    beforeSearchTitle,
    'Resource should filter correct resources'
  );
}

async function deleteResource(I) {

  const title = await I.grabAttributeFrom('.resource:first-of-type  > .resourceLink', 'title');
  I.click('.deleteButton');
  I.see(title);
  I.click('.confirmButton');
  I.waitForText('Resource Link Deleted', 10);
  I.dontSee(title);
}

async function sortResource(I) {
  const firstLocalResourceTitle = 'local1 ' + Date.now();
  I.click('.addResourceButton:first-of-type');
  I.fillField('.titleField', firstLocalResourceTitle);
  I.fillField('.urlField', 'Y:/TstFle.txt');
  I.click('SAVE', '.modal');

  const secondLocalResourceTitle = 'local2 ' + Date.now();
  I.click('.addResourceButton:first-of-type');
  I.fillField('.titleField', secondLocalResourceTitle);
  I.fillField('.urlField', 'Y:/TstFle.txt');
  I.click('SAVE', '.modal');

  I.click(locate('.resourceLink').withAttr({title: secondLocalResourceTitle}));
  I.click(locate('.resourceLink').withAttr({title: secondLocalResourceTitle}));
  I.click(locate('.resourceLink').withAttr({title: secondLocalResourceTitle}));
  I.selectOption('.sortSelector', 'Alphabetical');
  I.selectOption('.sortSelector', 'Most Clicked');

  const firstRankTitle = await I.grabAttributeFrom(
    locate('.resourceLink'),
    'title'
  );
  homeAssert.strictEqual(
    firstRankTitle,
    secondLocalResourceTitle,
    'Resource should be sorted by most clicked'
  );

}
