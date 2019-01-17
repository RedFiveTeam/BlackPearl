import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Card } from './Card';
import { StyledAddResourceButton } from '../button/AddResourceButton';
import { Category, ResourceModel } from '../resource/ResourceModel';
import { StyledResourceContainer } from '../resource/ResourceContainer';
import { StyledCardContainer } from './CardContainer';
import { Provider } from 'mobx-react';

describe('Card', () => {
  let subject: ReactWrapper;
  let resourceStore: any;
  let resourceActions: any;
  let profileStore: any;
  let profileActions: any;

  resourceStore = {
    activeTab: 1,
    returnResourcesInCategory: jest.fn(),
    resources: [new ResourceModel(1, '', '', 1, '', 0)]
  };

  profileStore = {
    profile: { sort: 1 },
  };

  profileActions = {
    setProfile: jest.fn()
  };

  resourceActions = {
    setAllResources: jest.fn()
  };

  beforeEach(() => {
    subject = mount(
      <Provider
        resourceStore={resourceStore}
        resourceActions={resourceActions}
        profileStore={profileStore}
        profileActions={profileActions}
      >
        <StyledCardContainer
          resourceStore={resourceStore}
          resourceActions={resourceActions}
          profileStore={profileStore}
          profileActions={profileActions}
        >
          <Card
            category={Category.FMV_Main}
            resources={[
              new ResourceModel(1, 'https://www.test.com', 'Test', 1, 'Bob')
            ]}
          />
        </StyledCardContainer>
      </Provider>
    );
  });

  it('should render a resource list with a list of resources', () => {
    expect(subject.find(StyledResourceContainer).exists()).toBeTruthy();
  });

  it('should render a add resource button', () => {
    expect(subject.find(StyledAddResourceButton).exists()).toBeTruthy();
  });

  it('should have a title', () => {
    expect(subject.find('.cardTitle').first().text()).toBe('Main');
  });

  it('should have a className equal to its category', () => {
    expect(subject.find('.category' + Category.FMV_Main).exists()).toBeTruthy();
  });
});