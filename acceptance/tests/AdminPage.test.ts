/// <reference path="../steps.d.ts" />
const moment = require('moment-timezone');

Feature('Admin Page');

Scenario('should allow admin to change a time zone', async (I) => {
  var assert = require('assert');
  I.amOnPage('/admin');
  I.waitForElement('input', 10);
  I.fillField(locate('input').inside('.timezoneRow').first(), 'accTest');

  I.selectOption(locate('select').inside('.timezoneRow').first(), 'America/Tortola');
  I.click('Submit');
  I.wait(1);
  I.amOnPage('/');
  I.waitForText('accTest', 10);

  const expectedTime = moment.tz(moment(), 'America/Tortola').format('HHmm').substr(0,3);
  const timeValue = await I.grabTextFrom(locate('.time').first());
  const actualTime = timeValue[0].substr(0,3);
  assert.equal(actualTime, expectedTime);
});