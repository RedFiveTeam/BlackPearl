/// <reference path="../steps.d.ts" />
let adminAssert = require('assert');
const moment = require('moment-timezone');

Feature('Admin Page');

Scenario('should allow admin to change a time zone', async (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/admin');
  I.click('.tabSelector:nth-of-type(2)');
  I.waitForElement('input', 10);

  I.clearField('.timezoneRow:first-of-type > input');
  I.fillField('.timezoneRow:first-of-type > input', 'accTest');
  I.selectOption('.timezoneRow:first-of-type > select', 'America/Tortola');
  I.click('SAVE');
  I.waitForElement('.customToast');
  I.amOnPage('/');
  I.waitForText('accTest', 10);

  const expectedTime = moment.tz(moment(), 'America/Tortola').format('HHmm').substr(0,3);
  const timeValue = await I.grabTextFrom(locate('.time').first());
  const actualTime = timeValue[0].substr(0,3);
  adminAssert.strictEqual(actualTime, expectedTime);
});

Scenario('should allow admin to change general information', async (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/admin');
  I.waitForElement('.information', 10);
  I.clearField('.information:first-of-type > .informationContent > input');
  I.fillField('.information:first-of-type > .informationContent > input', 'www.com');
  I.click('SAVE');
  I.waitForElement('.customToast');
  I.amOnPage('/');
  I.waitForText('www.com', 10);
});

Scenario('should allow admin to add and delete an acronym', async (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/admin');
  I.click('.tabSelector:nth-of-type(3)');
  I.waitForElement('.addAcronymButton', 10);
  I.click('.addAcronymButton');
  I.fillField('.acronymField', 'WAT');
  I.fillField('.definitionField', 'Wombats Are Tasty');
  I.click('.saveAcronymButton');
  I.waitForElement('.customToast');
  I.waitForText('Wombats Are Tasty', 10);
  I.click('tr:first-of-type > .actionColumn > div > .deleteAcronymButton');
  I.see('WAT', '.acronymColumn:first-of-type');
  I.click('DELETE');
  I.dontSee('WAT', '.acronymColumn:first-of-type');
});

Scenario('should allow admin to change a weather data', async (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/admin');
  I.waitForElement('.tabSelector', 10);
  I.click('.tabSelector:nth-of-type(4)');
  I.waitForElement('.weatherURL', 10);
  I.clearField('.weatherRow:first-of-type > input:nth-of-type(2)');
  I.fillField('.weatherRow:first-of-type > input:nth-of-type(2)', 'http://superweather.com');
  I.clearField('.weatherRow:first-of-type > input:first-of-type');
  I.fillField('.weatherRow:first-of-type > input:first-of-type', 'SUP');
  I.click('SAVE');
  I.waitForElement('.customToast');
  I.amOnPage('/');
  I.waitForText('SUP', 10);
  const url = await I.grabAttributeFrom('.weatherURL:first-of-type', 'href');
  adminAssert.strictEqual(url, 'http://superweather.com');
});