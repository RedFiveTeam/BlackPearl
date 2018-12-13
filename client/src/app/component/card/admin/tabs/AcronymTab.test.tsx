import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AcronymTab } from './AcronymTab';

describe('AcronymTab', () => {
  let subject: ShallowWrapper;
  let adminActions: any;
  let adminStore: any;
  let acronymActions: any;
  let acronymStore: any;

  beforeEach(() => {
    acronymActions = {
      setFilteredAcronyms: jest.fn(),
      setAllAcronyms: jest.fn()
    };

    acronymStore = {
    };

    adminActions = {
      updatePendingAcronym: jest.fn(),
      addAcronym: jest.fn()
    };

    adminStore = {
      performLoading: async (func: any) => {
        await func();
      }
    };

    subject = shallow(
      <AcronymTab
        adminActions={adminActions}
        adminStore={adminStore}
        acronymStore={acronymStore}
        acronymActions={acronymActions}
      />
    );
  });

  it('should have a title', () => {
    expect(subject.find('.acronymTitle').text()).toBe('Current Acronyms');
  });

  it('should have a delete button', () => {
    expect(subject.find('.deleteAcronymButton').exists()).toBeTruthy();
  });

  it('should have an add acronym button', () => {
    expect(subject.find('.addAcronymButton').exists()).toBeTruthy();
    expect(subject.find('.addAcronymButton').text()).toBe('Add');
  });

  it('should have an input for an acronym and a definition', () => {
    expect(subject.find('.acronymAdd').exists()).toBeTruthy();
    expect(subject.find('.acronymAddDefinition').exists()).toBeTruthy();
  });

  it('should pass the new acronym values to be saved', async () => {
    subject.find('.acronymAdd').simulate('change', {target: {value: 'AT'}});
    subject.find('.acronymAddDefinition').simulate('change', {target: {value: 'Acronym Test'}});
    await (subject.instance() as AcronymTab).onAddAcronymButtonClick();
    expect(adminActions.updatePendingAcronym).toHaveBeenCalledWith('AT', 'Acronym Test');
    expect(adminActions.addAcronym).toHaveBeenCalled();
  });

  it('should have an acronym search box ', () => {
    expect(subject.find('.acronymSearch').exists()).toBeTruthy();
    expect(subject.find('.acronymList').exists()).toBeTruthy();
  });

  it('should update acronym list on type in search box', () => {
    subject.find('.acronymSearch').simulate('change', {target: { value: 'test' }});
    expect(acronymActions.setFilteredAcronyms).toHaveBeenCalled();
  });
});