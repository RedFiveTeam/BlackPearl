import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { StyledAddResourceButton } from './AddResourceButton';
import { StyledButton } from './Button';
import { Category } from '../resource/ResourceModel';

describe('AddResourceButton', () => {
  let subject: ReactWrapper;
  let resourceActions: any;
  let category: any;

  beforeEach(() => {

    resourceActions  = {
      createPendingResource: jest.fn(),
      setPendingResourceAccountID: jest.fn(),
      setPendingResourceCategory: jest.fn()
    };

    category = Category.FMV_Main;

    subject = mount(<StyledAddResourceButton resourceActions={resourceActions} category={category} />);
  });

  it('should display resource popup', () => {
    subject.find(StyledButton).simulate('click');
    expect(resourceActions.createPendingResource).toHaveBeenCalled();
    expect(resourceActions.setPendingResourceCategory).toHaveBeenCalledWith(Category.FMV_Main);
    expect(resourceActions.setPendingResourceAccountID).toHaveBeenCalled();
  });
});