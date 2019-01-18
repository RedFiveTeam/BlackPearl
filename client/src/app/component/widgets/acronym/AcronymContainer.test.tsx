import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { AcronymContainer, StyledAcronymContainer } from './AcronymContainer';
import { AcronymModel } from './AcronymModel';
import { Provider } from 'mobx-react';

describe('AcronymContainer', () => {
  let acronymStore: any;
  let acronymActions: any;
  let metricActions: any;
  let subject: any;

  beforeEach(() => {
    metricActions = {
      logMetric: jest.fn()
    };

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
        metricActions={metricActions}
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
    subject = mount(
      <Provider
        acronymStore={acronymStore}
        acronymActions={acronymActions}
        metricActions={metricActions}
      >
      <StyledAcronymContainer/>
      </Provider>);
    subject.find('.acronymSearch').simulate('change', {target: {value: 'test'}});
    expect(acronymActions.setFilteredAcronyms).toHaveBeenCalled();
  });
});