import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { StyledAddResourceButton } from './AddResourceButton';
import { StyledButton } from './Button';

describe('AddResourceButton', () => {
  let subject: ReactWrapper;
  let resourceActions: any;

  beforeEach(() => {

    resourceActions  = {
      createPendingResource: jest.fn()
    };

    subject = mount(<StyledAddResourceButton resourceActions={resourceActions} />);
  });

  it('should display resource popup', () => {
    subject.find(StyledButton).simulate('click');
    expect(resourceActions.createPendingResource).toHaveBeenCalled();
  });
});