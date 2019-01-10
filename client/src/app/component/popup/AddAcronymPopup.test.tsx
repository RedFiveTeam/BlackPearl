import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AddAcronymPopup } from './AddAcronymPopup';
import { StyledPopupModal } from './PopupModal';

describe('AddAcronymPopup', () => {
  let subject: ReactWrapper;
  let acronymActions: any;
  let acronymStore: any;

  beforeEach(() => {
    acronymActions = {
      addAcronym: jest.fn()
    };

    acronymStore = {

    };

    subject = mount(
      <AddAcronymPopup
        acronymStore={acronymStore}
        acronymActions={acronymActions}
      />
    );
  });

  it('should contain a styled popup', () => {
    expect(subject.find(StyledPopupModal).exists()).toBeTruthy();
  });

  it('should have two input fields', () => {
    expect(subject.find('input').length).toBe(2);
  });

  it('should save an acronym on save click', () => {
    subject.setState({acronym: 'ABC', definition: 'Alpha Beta Charlie'});
    subject.find('.saveAcronymButton').simulate('click');
    expect(acronymActions.addAcronym).toHaveBeenCalledWith('ABC', 'Alpha Beta Charlie');
  });
});