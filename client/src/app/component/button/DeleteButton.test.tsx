import * as React from 'react';
import { DeleteIcon } from '../../icon/DeleteIcon';
import { shallow, ShallowWrapper } from 'enzyme';
import { DeleteButton } from './DeleteButton';
import { ResourceModel } from '../../resource/ResourceModel';
import { StyledButton } from './Button';

describe('Delete Button', () => {
  let subject: ShallowWrapper;
  let resourceActions: any;
  let resource: ResourceModel;

  beforeEach(() => {
    resource = new ResourceModel(1, 'metimber.com', 'Shiver');
    resourceActions = {
      delete: jest.fn()
    };

    subject = shallow(
      <DeleteButton
        resource={resource}
        resourceActions={resourceActions}
      />
    );
  });

  it('should render a delete icon', () => {
    expect(subject.find(DeleteIcon).exists()).toBeTruthy();
  });

  it('should trigger a delete action on click', () => {
    subject.find(StyledButton).simulate('click');
    expect(resourceActions.delete).toHaveBeenCalledWith(resource.id);
  });
});