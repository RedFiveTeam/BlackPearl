/// <reference path="../steps.d.ts" />
let assert = require('assert');
const moment = require('moment-timezone');

Feature('Admin Page');

Scenario('should allow admin to change a time zone', async (I) => {
  I.amOnPage('/admin');
  I.waitForElement('input', 10);
  I.fillField(locate('input').inside('.timezoneRow').first(), 'accTest');

  I.selectOption(locate('select').inside('.timezoneRow').first(), 'America/Tortola');
  I.click('Save');
  I.wait(5);
  I.amOnPage('/');
  I.waitForText('accTest', 10);

  const expectedTime = moment.tz(moment(), 'America/Tortola').format('HHmm').substr(0,3);
  const timeValue = await I.grabTextFrom(locate('.time').first());
  const actualTime = timeValue[0].substr(0,3);
  assert.strictEqual(actualTime, expectedTime);
});

Scenario('should allow admin to change a weather data', async (I) => {
  I.amOnPage('/admin');
  I.waitForElement('.weatherURL', 10);
  I.fillField(locate('.weatherURL').first(), 'http://superweather.com');
  I.fillField(locate('.weatherLabel').first(), 'SUP');
  I.click('Save');
  I.wait(5);
  I.amOnPage('/');
  I.waitForText('SUP', 10);
  const url = await I.grabAttributeFrom(locate('.weatherURL').first(), 'href');
  assert(url, 'http://superweather.com');
});

Scenario('should allow admin to change general information', async (I) => {
  I.amOnPage('/admin');
  I.waitForElement('.information', 10);
  I.fillField(locate('.informationContent').first(), 'www.com');
  I.click('Save');
  I.wait(5);
  I.amOnPage('/');
  I.waitForText('www.com', 10);
});