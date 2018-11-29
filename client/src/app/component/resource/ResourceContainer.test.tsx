import * as React from 'react';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import { Category, ResourceModel } from './ResourceModel';
import { ResourceContainer } from './ResourceContainer';
import { Provider } from 'mobx-react';

describe('ResourceContainer', () => {
  let subject: ReactWrapper;
  let resourceStore: any;
  let resourceActions: any;
  let profileStore: any;

  resourceStore = {};

  profileStore = {};

  resourceActions = {
    updateGivenResources: jest.fn()
  };

  beforeEach(() => {
    subject = mount(
      <Provider resourceStore={resourceStore} resourceActions={resourceActions} profileStore={profileStore}>
        <ResourceContainer
          category={Category.FMV_Main}
          resourceActions={resourceActions}
          resources={[
            new ResourceModel(1, 'https://www.google.com', 'Google', Category.FMV_Main),
            new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', Category.FMV_Main),
          ]}
        />
      </Provider>
    );

  });

  it('should render resources based on the props', () => {
    expect(subject.find('.resource').length).toEqual(2);
  });

  it('should update resources when reordered', async () => {
    let shallowSubject: ShallowWrapper;
    shallowSubject = shallow(
        <ResourceContainer
          category={Category.FMV_Main}
          resourceActions={resourceActions}
          resources={[
            new ResourceModel(1, 'https://www.google.com', 'Google', Category.FMV_Main),
            new ResourceModel(2, 'https://www.yahoo.com', 'Yahoo', Category.FMV_Main),
          ]}
        />
    );

    let result = {
      destination: { index: 1 },
      source: { index: 1 }
    };

    await (shallowSubject.instance() as ResourceContainer).onDragEnd(result);

    expect(resourceActions.updateGivenResources).toHaveBeenCalled();
  });
});