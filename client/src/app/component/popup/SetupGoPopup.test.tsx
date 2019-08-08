import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SetupGoPopup } from './SetupGoPopup';
import { StyledPopupModal } from './PopupModal';

describe('SetupGoPopup', () => {
  let subject: ShallowWrapper;
  let resourceStore: any;

  beforeEach(() => {
    resourceStore = {
      toggleGoPopup: jest.fn()
    };

    subject = shallow(
      <SetupGoPopup
        resourceStore={resourceStore}
      />
    );
  });

  it('should render a popup', () => {
    expect(subject.find(StyledPopupModal).exists()).toBeTruthy();
  });
});
