import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ResourceMenuContainer } from './ResourceMenuContainer';
import { StyledDeleteButton } from '../button/DeleteButton';
import { StyledEditButton } from '../button/EditButton';
import { ResourceModel } from './ResourceModel';
import { ProfileStore } from '../../profile/ProfileStore';
import { ProfileModel } from '../../profile/ProfileModel';
import { ResourceStore } from './stores/ResourceStore';

describe('ResourceMenuContainer', () => {
  let subject: ShallowWrapper;
  let resource: ResourceModel;
  let resourceActions: any;
  let resourceStore: ResourceStore;
  let profileStore: ProfileStore;
  let metricActions: any;

  beforeEach(() => {
    metricActions = {
      logMetric: jest.fn()
    };

    resource = new ResourceModel();
    resourceStore = new ResourceStore();
    profileStore = new ProfileStore();

    resourceActions = {
      saveFavorite: jest.fn(),
      createPendingEdit: jest.fn(),
      createPendingDelete: jest.fn()
    };

    profileStore.setProfile(new ProfileModel(null, 'cardID', 'AltId', 1, 0, 1));

    subject = shallow(
      <ResourceMenuContainer
        resource={resource}
        resourceStore={resourceStore}
        resourceActions={resourceActions}
        profileStore={profileStore}
        metricActions={metricActions}
      />
    );
  });

  it('should trigger a edit action on edit button click', () => {
    subject.find(StyledEditButton).simulate('click');
    expect(resourceActions.createPendingEdit).toHaveBeenCalledWith(resource);
  });

  it('should trigger a delete action on click', () => {
    subject.find(StyledDeleteButton).simulate('click');
    expect(resourceActions.createPendingDelete).toHaveBeenCalledWith(resource);
  });
});
