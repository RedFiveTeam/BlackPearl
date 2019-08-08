/// <reference path="../steps.d.ts" />
let adminAssert = require('assert');
const moment = require('moment-timezone');

Feature('Admin Page');

Scenario('should allow and admin to change information', async (I) => {
  I.amOnPage('/admin');
  changeGeneralInfo(I);
  await changeTimeZone(I);
  await changeWeatherData(I);
  changeAcronym(I);
  await checkForChanges(I);
});

async function changeTimeZone(I) {
  I.click('.tabSelector:nth-of-type(2)');
  I.waitForElement('input', 10);
  I.clearField('.timezoneRow:first-of-type > input');
  I.fillField('.timezoneRow:first-of-type > input', 'accTest');
  I.selectOption('.timezoneRow:first-of-type > select', 'America/Tortola');
  I.click('SAVE');
  I.waitForElement('.customToast');
}

function changeGeneralInfo(I) {
  I.waitForElement('.information', 10);
  I.clearField('.information:first-of-type > .informationContent > input');
  I.fillField('.information:first-of-type > .informationContent > input', 'www.com');
  I.click('SAVE');
  I.waitForElement('.customToast');
}

async function changeWeatherData(I) {
  I.waitForElement('.tabSelector', 10);
  I.click('.tabSelector:nth-of-type(4)');
  I.waitForElement('.weatherURL', 10);
  I.clearField('.weatherRow:first-of-type > input:nth-of-type(2)');
  I.fillField('.weatherRow:first-of-type > input:nth-of-type(2)', 'http://superweather.com');
  I.clearField('.weatherRow:first-of-type > input:first-of-type');
  I.fillField('.weatherRow:first-of-type > input:first-of-type', 'SUP');
  I.click('SAVE');
  I.waitForElement('.customToast');
}

function changeAcronym(I) {
  I.click('.tabSelector:nth-of-type(3)');
  I.waitForElement('.addAcronymButton', 10);
  I.click('.addAcronymButton');
  I.fillField('.acronymField', 'WAT');
  I.fillField('.definitionField', 'Wombats Are Tasty');
  I.click('.saveAcronymButton');
  I.waitForElement('.customToast');
  I.waitForText('Wombats Are Tasty', 10);
  I.click('tr:first-of-type > .actionColumn > div > .deleteAcronymButton');
  I.see('WAT', '#scrollBody > tr:first-of-type > .acronymColumn');
  I.click('DELETE');
  I.dontSee('WAT', '#scrollBody > tr:first-of-type > .acronymColumn');
}

async function checkForChanges(I) {
  I.amOnPage('/');
  // time zone
  I.waitForText('accTest', 10);

  const expectedTime = moment.tz(moment(), 'America/Tortola').format('HHmm').substr(0,3);
  const timeValue = await I.grabTextFrom(locate('.time').first());
  const actualTime = timeValue[0].substr(0,3);
  adminAssert.strictEqual(actualTime, expectedTime);

  // gen info
  I.waitForText('www.com', 10);

  //weather
  I.waitForText('SUP', 10);
  const url = await I.grabAttributeFrom('.weatherURL:first-of-type', 'href');
  adminAssert.strictEqual(url, 'http://superweather.com');
}
