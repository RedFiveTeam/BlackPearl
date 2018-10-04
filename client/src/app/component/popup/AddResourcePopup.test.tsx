import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { ResourceStore } from '../../resource/stores/ResourceStore';
import { StyledAddResourcePopup } from './AddResourcePopup';
import { ResourceActions } from '../../resource/actions/ResourceActions';
import { StubRepositories } from '../../utils/Repositories';
import { stores } from '../../utils/Stores';

describe('AddResourcePopup', () => {
  let subject: ReactWrapper;
  let resourceStore: ResourceStore;
  let resourceActions: ResourceActions;

  beforeEach(() => {
    resourceStore = new ResourceStore();
    resourceActions = new ResourceActions(stores, StubRepositories);

    subject = mount(<StyledAddResourcePopup resourceActions={resourceActions}/>);
  });

  it('should close the popup when cancel is clicked', () => {
    subject.find('.cancelButton').simulate('click');
    expect(resourceStore.hasPendingResource).toBeFalsy();
  });

  it('should render a name field', () => {
    expect(subject.find('.titleField').length).toBe(1);
  });

  it('should render a url field', () => {
    expect(subject.find('.urlField').length).toBe(1);
  });
});