import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePage } from './HomePage';
import { StyledCard } from '../component/card/Card';
import { StyledAddResourcePopup } from '../component/popup/AddResourcePopup';
import { ResourceStore } from '../resource/stores/ResourceStore';
import { ResourceModel } from '../resource/ResourceModel';

describe('HomePage', () => {
  let subject: ShallowWrapper;
  let resourceStore: ResourceStore;

  beforeEach(() => {
    resourceStore = new ResourceStore();

    subject = shallow(
      <HomePage
        resourceStore={resourceStore}
      />
    );
  });

  it('should display a card', () => {
    expect(subject.find(StyledCard).exists()).toBeTruthy();
  });

  it('should not display a add resource popup by default', () => {
    expect(subject.find(StyledAddResourcePopup).exists()).toBeFalsy();
  });

  it('should display add resource popup', () => {
    expect(subject.find(StyledAddResourcePopup).exists()).toBeFalsy();
    resourceStore.setPendingResource(new ResourceModel(null, '', ''));
    expect(subject.find(StyledAddResourcePopup).exists()).toBeTruthy();
  });
});