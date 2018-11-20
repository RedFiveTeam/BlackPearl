import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePage } from './HomePage';
import { StyledAddResourcePopup } from '../component/popup/AddResourcePopup';
import { ResourceStore } from '../component/resource/stores/ResourceStore';
import { Category, ResourceModel } from '../component/resource/ResourceModel';
import { StyledCardContainer } from '../component/card/CardContainer';
import { StyledAcronymContainer } from '../component/widgets/acronym/AcronymContainer';
import { StyledWeatherContainer } from '../component/widgets/weather/WeatherContainer';
import {
  StyledCoordinateConverterContainer
} from '../component/widgets/coordinateConverter/CoordinateConverterContainer';
import { StyledLoadingOverlay } from '../component/loading/LoadingOverlay';

describe('HomePage', () => {
  let subject: ShallowWrapper;
  let resourceStore: ResourceStore;
  let returnResourcesInCategorySpy: jest.Mock;

  beforeEach(() => {
    resourceStore = new ResourceStore();

    returnResourcesInCategorySpy = jest.fn();

    resourceStore.returnResourcesInCategory = returnResourcesInCategorySpy;

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

  it('should have an acronym container', () => {
    expect(subject.find(StyledAcronymContainer).exists()).toBeTruthy();
  });

  it('should have a widgets section', () => {
    expect(subject.find('.widgetSection').exists()).toBeTruthy();
  });

  it('should have a CardContainer', () => {
    expect(subject.find(StyledCardContainer).exists()).toBeTruthy();
  });

  it('should have a my favorites card', () => {
    expect(subject.find('.myFavorites').exists()).toBeTruthy();
  });

  it('should pass the favorite resources to the favorites card', () => {
    expect(resourceStore.returnResourcesInCategory).toHaveBeenCalledWith(Category.Favorites);
  });

  it('should have a weather container', () => {
    expect(subject.find(StyledWeatherContainer).exists()).toBeTruthy();
  });

  it('should have a Coordinate Converter', () => {
    expect(subject.find(StyledCoordinateConverterContainer).exists()).toBeTruthy();
  });

  it('should render the loading overlay', () => {
    resourceStore.setLoading(true);
    expect(subject.find(StyledLoadingOverlay).exists()).toBeTruthy();
  });
});