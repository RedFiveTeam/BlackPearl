import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Category, ResourceModel } from './ResourceModel';
import { ResourceContainer } from './ResourceContainer';
import { StyledCardContainer } from '../card/CardContainer';
import { Provider } from 'mobx-react';

describe('ResourceContainer', () => {
  let subject: ReactWrapper;
  let resourceStore: any;
  let resourceActions: any;
  let profileStore: any;
  let profileActions: any;
  let metricActions: any;

  profileActions = {
    setProfile: jest.fn()
  };

  metricActions = {};

  resourceStore = {
    resources: [new ResourceModel(1, '', '', 1, '', 0)],
    returnResourcesInCategory: () => {
      return [new ResourceModel(1, '', '', 1, '', 0), new ResourceModel(2, '', '', 1, '', 0)];
    }
  };

  profileStore = {
    profile: jest.fn()
  };

  resourceActions = {
    setAllResources: jest.fn(),
    updateGivenResources: jest.fn()
  };

  beforeEach(() => {
    subject = mount(
      <Provider
        resourceStore={resourceStore}
        resourceActions={resourceActions}
        profileStore={profileStore}
        profileActions={profileActions}
        metricActions={metricActions}
      >
        <StyledCardContainer
          resourceStore={resourceStore}
          resourceActions={resourceActions}
          profileStore={profileStore}
          profileActions={profileActions}
        >
          <ResourceContainer
            category={Category.FMV_Main}
            resourceActions={resourceActions}
            resources={[]}
          />
        </StyledCardContainer>
      </Provider>
    );

  });

  it('should render resources based on the props', () => {
    expect(subject.find('.resource').length).toEqual(6);
  });
});
