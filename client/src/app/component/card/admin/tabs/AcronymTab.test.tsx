import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AcronymTab } from './AcronymTab';
import { StyledAdminAcronymRow } from '../../../widgets/acronym/AdminAcronymRow';
import { AcronymModel } from '../../../widgets/acronym/AcronymModel';

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
      filteredAcronyms: [new AcronymModel(0, 'ABC', 'Alpha Bravo Charlie', 'ABC - Alpha Bravo Charlie')],
      setSearch: jest.fn()
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

  it('should have an acronym row', () => {
    expect(subject.find(StyledAdminAcronymRow).exists()).toBeTruthy();
  });

  it('should have an add acronym button', () => {
    expect(subject.find('.addAcronymButton').exists()).toBeTruthy();
    expect(subject.find('.addAcronymButton').text()).toContain('ADD NEW');
  });

  it('should have an acronym search box and table', () => {
    expect(subject.find('.acronymSearch').exists()).toBeTruthy();
    expect(subject.find('table').exists()).toBeTruthy();
  });

  it('should update acronym list on type in search box', () => {
    subject.find('.acronymSearch > input').simulate('change', {target: { value: 'test' }});
    expect(acronymActions.setFilteredAcronyms).toHaveBeenCalled();
  });
});