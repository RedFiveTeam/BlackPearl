import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TabContainer } from './TabContainer';

describe('TabContainer', () => {
  let subject: ShallowWrapper;
  let resourceStore: any;
  let profileStore: any;
  let resourceActions: any;
  let profileActions: any;

  beforeEach(() => {
    resourceStore = {
      setActiveTab: jest.fn()
    };

    profileStore = {
      profile: {name: 'Bob'}
    };

    resourceActions = {
      filterResources: jest.fn(),
      sortResources: jest.fn()
    };

    profileActions = {
      updateSort: jest.fn(),
      changeDefaultTab: jest.fn()
    };

    subject = shallow(
      <TabContainer
        resourceStore={resourceStore}
        profileStore={profileStore}
        resourceActions={resourceActions}
        profileActions={profileActions}
      />
    );
  });

  it('should render tabs', () => {
    expect(subject.find('.tab').length).toBe(4);
    expect(subject.find('.tab1').text()).toBe('FMV');
    expect(subject.find('.tab2').text()).toBe('High Alt');
    expect(subject.find('.tab3').text()).toBe('Fusion');
    expect(subject.find('.tab4').text()).toBe('SIGINT');
  });

  it('should change the active tab', async () => {
    await (subject.instance() as TabContainer).clickTab(2);
    expect(resourceStore.setActiveTab).toHaveBeenCalledWith(2);
  });

  it('should display a sort by selector', () => {
    expect(subject.find('.sortSelector').exists()).toBeTruthy();
  });

  it('should display a filter section', () => {
    expect(subject.find('.filterSection').exists()).toBeTruthy();
  });

  it('should save the sort option', async () => {
    subject.find('.sortSelector').simulate('change', {target: {value: 2}});
    await expect(profileActions.updateSort).toHaveBeenCalled();
    await expect(resourceActions.sortResources).toHaveBeenCalled();
  });
});