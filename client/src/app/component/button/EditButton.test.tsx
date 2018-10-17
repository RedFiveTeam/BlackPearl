import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ResourceModel } from '../../resource/ResourceModel';
import { StyledButton } from './Button';
import { EditButton } from './EditButton';
import { EditIcon } from '../../icon/EditIcon';

describe('Edit Button', () => {
  let subject: ShallowWrapper;
  let resourceActions: any;
  let resource: ResourceModel;

  beforeEach(() => {
    resource = new ResourceModel(1, 'metimber.com', 'Shiver');
    resourceActions = {
      edit: jest.fn(),
      createPendingEdit: jest.fn()
    };

    subject = shallow(
      <EditButton
        resource={resource}
        resourceActions={resourceActions}
      />
    );
  });

  it('should render a edit icon', () => {
    expect(subject.find(EditIcon).exists()).toBeTruthy();
  });

  it('should trigger a edit action on click', () => {
    subject.find(StyledButton).simulate('click');
    expect(resourceActions.createPendingEdit).toHaveBeenCalledWith(resource);
  });

  it('should render a popup when edit is clicked', () => {
    subject.find(StyledButton).simulate('click');
    expect(resourceActions.createPendingEdit).toHaveBeenCalled();
  });
});