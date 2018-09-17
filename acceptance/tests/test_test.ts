/// <reference path="../steps.d.ts" />

Feature('try a thing');

Scenario('test something', (I) => {
    I.amOnPage('/');
    I.see('person');
    I.click('person');
    I.wait(2);
    I.see('Tyler');
    I.seeElement('#Bacon');
});