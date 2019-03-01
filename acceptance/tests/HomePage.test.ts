/// <reference path="../steps.d.ts" />

let homeAssert = require('assert');

Feature('Home Page');

Before((I) => {
  I.amOnPage('/');
  I.fillField('.username', 'jordan');
  I.fillField('password', 'password');
  I.click('Login');
  I.waitForText('Jordan', 10);
});

/* tslint:disable:no-any */
function checkCards(I) {

  I.see("Main", ".cardTitle");
  I.click('.tab:nth-of-type(1) > div', '.tabContainer');
  I.see('FMV Amazon');
  I.see('FMV YouTube');
  I.see('FMV Reddit');
  I.see("Situational Awareness", ".cardTitle");

  I.click('.tab:nth-of-type(2) > div', '.tabContainer');
  I.see('HA Amazon');
  I.see('HA YouTube');
  I.see('HA Reddit');
  I.see("Target Research", ".cardTitle");

  I.click('.tab:nth-of-type(3) > div', '.tabContainer');
  I.see('Fusion Amazon');
  I.see('Fusion YouTube');
  I.see('Fusion Reddit');
};

async function addResource(I) {

  I.click('.addResourceButton:first-of-type');

  I.click('SAVE', '.modal');
  I.waitForText('Please enter a title', 10);
  I.waitForText('Please enter an address', 10);
  I.click('CANCEL', '.modal');

  I.click('.addResourceButton:first-of-type');
  let superLongTitle = 'This string is waaaaaaay too long to possibly be a title. what am i even doing????? Whyyyyyyyy';
  I.fillField('.titleField', superLongTitle);
  let correctedTitle = await I.grabValueFrom('.titleField');
  homeAssert.strictEqual(
    correctedTitle.length,
    64,
    'Resource modal should shorten long titles'
  );

  const createValidTitle = 'create' + Date.now();
  I.fillField('.titleField', createValidTitle);
  correctedTitle = await I.grabValueFrom('.titleField');
  homeAssert.strictEqual(
    correctedTitle,
    createValidTitle,
    'Resource modal should keep valid titles'
  );
  I.fillField('.urlField', 'sometrash.com');
  I.click('SAVE', '.modal');
  I.waitForText('Please enter a valid address (https://www...)');

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

  I.clearField('.filterSection > input');
  I.amOnPage('/');
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
  const firstLocalResourceTitle = 'create local 1 ' + Date.now();
  I.click('.addResourceButton:first-of-type');
  I.fillField('.titleField', firstLocalResourceTitle);
  I.fillField('.urlField', 'Y:/TestFile.txt');
  I.click('SAVE', '.modal');

  const secondLocalResourceTitle = 'create local 2 ' + Date.now();
  I.click('.addResourceButton:first-of-type');
  I.fillField('.titleField', secondLocalResourceTitle);
  I.fillField('.urlField', 'Y:/TestFile.txt');
  I.click('SAVE', '.modal');

  I.click(locate('.resourceLink').withAttr({title: secondLocalResourceTitle}));
  I.click(locate('.resourceLink').withAttr({title: secondLocalResourceTitle}));
  I.click(locate('.resourceLink').withAttr({title: secondLocalResourceTitle}));
  I.selectOption('.sortSelector', 'Most Clicked');
  I.refreshPage();
  I.wait(2);
  I.waitForText('ATO', 10);

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

Scenario('should provide a resource features set', async (I) => {
  I.amOnPage('/');

  checkCards(I);
  await addResource(I);
  await editResource(I);
  await deleteResource(I);
  await sortResource(I);
  await searchResource(I);
});

Scenario('should provide functioning widgets', async (I) => {
  I.amOnPage('/');
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

  //should convert measurements
  I.fillField('.conversionInput', '1');
  let value = await I.grabValueFrom('.conversionOutput');
  homeAssert.strictEqual(
    value,
    '0.62',
    'Widget should convert KM to miles by default'
  );

  I.click('KM');
  I.click('.ddd:first-of-type'); // TODO fix selector for NM instead of numbered input
  value = await I.grabValueFrom('.conversionOutput');
  homeAssert.strictEqual(
    value,
    '1.15',
    'Widget should select NM and convert to miles'
  );

  I.fillField('.acronymSearch', 'AAM');
  I.waitForText("AAM - air-to-air missile", 10, ".acronym");

  I.waitForElement('.weatherURL', 10);
  let weatherCount = await I.grabNumberOfVisibleElements('.weatherURL');
  homeAssert.strictEqual(
    weatherCount,
    4,
    'Widget should have 4 weather URLs'
  );
});

Scenario('should provide static information in the app banner', async (I) => {
  I.amOnPage('/');
  I.see("ATO ", ".atoDay");

  const clockCount = await I.grabNumberOfVisibleElements('.clock');
  homeAssert.strictEqual(
    clockCount,
    6,
    'Banner should have 6 clocks'
  );
});

Scenario('should see a toast when clicking element in general info card', (I) => {
  I.amOnPage('/');
  I.click('.row:first-of-type > div:first-of-type');
  I.waitForElement('.customToast', 10);
});

Scenario('should see a general information card', (I) => {
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
