/// <reference path="../steps.d.ts" />

Feature('Error Page');

Scenario('should show a 404 page', async (I) => {
  I.haveHeader('Authorization', 'Basic Q1JPU1MuSk9SREFOLk1JRERMRS4wMTIzNDU2Nzg5Og==');
  I.amOnPage('/ehbrewhjrbewewrfr');
  I.see("Lost at Sea?");
});