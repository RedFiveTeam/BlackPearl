import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AcronymTab } from './AcronymTab';

describe('AcronymTab', () => {
  let subject: ShallowWrapper;
  let adminActions: any;
  let adminStore: any;

  beforeEach(() => {
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
      />
    );
  });

  it('should have an add acronym button', () => {
    expect(subject.find('.addAcronymButton').exists()).toBeTruthy();
    expect(subject.find('.addAcronymButton').text()).toBe('Add');
  });

  it('should have an input for an acronym and a definition', () => {
    expect(subject.find('.acronym').exists()).toBeTruthy();
    expect(subject.find('.acronymDefinition').exists()).toBeTruthy();
  });

  it('should pass the new acronym values to be saved', async () => {
    subject.find('.acronym').simulate('change', {target: {value: 'AT'}});
    subject.find('.acronymDefinition').simulate('change', {target: {value: 'Acronym Test'}});
    await (subject.instance() as AcronymTab).onAddAcronymButtonClick();
    expect(adminActions.updatePendingAcronym).toHaveBeenCalledWith('AT', 'Acronym Test');
    expect(adminActions.addAcronym).toHaveBeenCalled();
  });

});