import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { DeleteAcronymPopup } from './DeleteAcronymPopup';
import { StyledPopupModal } from './PopupModal';
import { AcronymModel } from '../widgets/acronym/AcronymModel';

describe('DeleteAcronymPopup', () => {
  let subject: ShallowWrapper;
  let acronymStore: any;

  beforeEach(() => {
    acronymStore = {
      pendingDelete: new AcronymModel()
    };

    subject = shallow(
      <DeleteAcronymPopup
        acronymStore={acronymStore}
      />
    );
  });

  it('should render a delete acronym popup', () => {
    expect(subject.find(StyledPopupModal).exists()).toBeTruthy();
  });

});