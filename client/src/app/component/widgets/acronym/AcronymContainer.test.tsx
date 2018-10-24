import * as React from 'react';
import { shallow } from 'enzyme';
import { AcronymContainer } from './AcronymContainer';
import { AcronymModel } from './AcronymModel';

describe('AcronymContainer', () => {
  let acronymStore: any;
  let acronymActions: any;
  let subject: any;

  beforeEach(() => {
    let acronyms = [
      new AcronymModel(1, 'AAA', 'Aaron Allon Arnold')
    ];

    acronymStore = {
      setAcronyms: jest.fn(),
      acronyms: acronyms
    };

    acronymActions = {
      setAllAcronyms: jest.fn(),
      setFilteredAcronyms: jest.fn()
    };

    subject = shallow(
      <AcronymContainer
        acronymStore={acronymStore}
        acronymActions={acronymActions}
      />
    );
  });

  it('should set the list of acronyms', () => {
    expect(acronymActions.setAllAcronyms).toHaveBeenCalled();
  });

  it('should render an acronym list', () => {
    expect(subject.find('.acronymList').exists()).toBeTruthy();
  });

  it('should render a search box', () => {
    expect(subject.find('.acronymSearch').exists()).toBeTruthy();
  });

  it('should update acronym list on type in search box', () => {
    subject.find('.acronymSearch').simulate('change', {target: { value: 'test' }});
    expect(acronymActions.setFilteredAcronyms).toHaveBeenCalled();
  });
});