import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TabContainer } from './TabContainer';

describe('TabContainer', () => {
  let subject: ShallowWrapper;
  let resourceStore: any;
  let profileStore: any;

  beforeEach(() => {
    resourceStore = {
      setActiveTab: jest.fn()
    };

    profileStore = {
      profile: {name: 'Bob'}
    };

    subject = shallow(
      <TabContainer
        resourceStore={resourceStore}
        profileStore={profileStore}
      />
    );
  });

  it('should render four tabs', () => {
    expect(subject.find('.tab').length).toBe(4);
    expect(subject.find('.tab1').text()).toBe('FMV');
    expect(subject.find('.tab2').text()).toBe('High Alt');
    expect(subject.find('.tab3').text()).toBe('Fusion');
    expect(subject.find('.tab4').text()).toBe('MOC');
  });

  it('should change the active tab', () => {
    (subject.instance() as TabContainer).clickTab(2);
    expect(resourceStore.setActiveTab).toHaveBeenCalledWith(2);
  });

  it('should display an profile banner', () => {
    expect(subject.find('.profileBanner').exists()).toBeTruthy();
  });
});