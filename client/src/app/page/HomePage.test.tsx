import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePage } from './HomePage';
import { StyledAddResourcePopup } from '../component/popup/AddResourcePopup';
import { ResourceStore } from '../resource/stores/ResourceStore';
import { ResourceModel } from '../resource/ResourceModel';
import { StyledCardContainer } from '../component/card/CardContainer';
import {
  StyledCoordinateConverterContainer
} from '../component/widgets/coordinateConverter/CoordinateConverterContainer';

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
    expect(subject.find(StyledCardContainer).exists()).toBeTruthy();
  });

  it('should not display a add resource popup by default', () => {
    expect(subject.find(StyledAddResourcePopup).exists()).toBeFalsy();
  });

  it('should display add resource popup', () => {
    expect(subject.find(StyledAddResourcePopup).exists()).toBeFalsy();
    resourceStore.setPendingResource(new ResourceModel(null, '', ''));
    expect(subject.find(StyledAddResourcePopup).exists()).toBeTruthy();
  });

  it('should have a widgets section', () => {
    expect(subject.find('.widgetSection').exists()).toBeTruthy();
  });

  it('should have a CardContainer', () => {
    expect(subject.find(StyledCardContainer).exists()).toBeTruthy();
  });

  it('should have a Coordinate Converter', () => {
    expect(subject.find(StyledCoordinateConverterContainer).exists()).toBeTruthy();
  });
});