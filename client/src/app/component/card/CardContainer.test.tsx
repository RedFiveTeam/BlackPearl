import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CardContainer } from './CardContainer';
import { StyledCard } from './Card';
import { Category } from '../resource/ResourceModel';
import { StyledInformationContainer } from './information/InformationContainer';
import { StyledOperationContainer } from './operation/OperationContainer';

describe('CardContainer', () => {
  let subject: ShallowWrapper;
  let resourceActions: any;
  let resourceStore: any;
  let profileActions: any;

  beforeEach(() => {
    resourceActions = {
      setAllResources: jest.fn()
    };

    resourceStore = {
      returnResourcesInCategory: jest.fn(),
      activeTab: 1
    };

    profileActions = {
      setProfile: jest.fn()
    };

    subject = shallow(
      <CardContainer
        profileActions={profileActions}
        resourceActions={resourceActions}
        resourceStore={resourceStore}
      />
    );
  });

  it('should have a card for each card category', () => {
    expect(subject.find(StyledCard).length).toBe(3);
    expect(subject.find(StyledCard).at(0).prop('category')).toBe(Category.FMV_Main);
    expect(subject.find(StyledCard).at(1).prop('category')).toBe(Category.FMV_SituationalAwareness);
    expect(subject.find(StyledCard).at(2).prop('category')).toBe(Category.FMV_TargetResearch);
  });

  it('should pass the resources to each card based on category', () => {
    expect(resourceStore.returnResourcesInCategory).toHaveBeenCalledWith(Category.FMV_Main);
    expect(resourceStore.returnResourcesInCategory).toHaveBeenCalledWith(Category.FMV_SituationalAwareness);
    expect(resourceStore.returnResourcesInCategory).toHaveBeenCalledWith(Category.FMV_TargetResearch);
  });

  it('should have a card for each card category after the tab has changed', () => {
    resourceStore.activeTab = 2;
    subject.setProps({resourceStore: resourceStore});
    expect(subject.find(StyledCard).length).toBe(3);
    expect(subject.find(StyledCard).at(0).prop('category')).toBe(Category.HighAlt_Main);
    expect(subject.find(StyledCard).at(1).prop('category')).toBe(Category.HighAlt_SituationalAwareness);
    expect(subject.find(StyledCard).at(2).prop('category')).toBe(Category.HighAlt_TargetResearch);
  });

  it('should pass the resources to each card based on category after the tab has changed', () => {
    resourceStore.activeTab = 2;
    subject.setProps({resourceStore: resourceStore});
    expect(resourceStore.returnResourcesInCategory).toHaveBeenCalledWith(Category.HighAlt_Main);
    expect(resourceStore.returnResourcesInCategory).toHaveBeenCalledWith(Category.HighAlt_SituationalAwareness);
    expect(resourceStore.returnResourcesInCategory).toHaveBeenCalledWith(Category.HighAlt_TargetResearch);
  });

  it('should put all resources in the ResourceStore', () => {
    expect(resourceActions.setAllResources).toHaveBeenCalled();
  });

  it('should set the profile', () => {
    expect(profileActions.setProfile).toHaveBeenCalled();
  });

  it('should render an information card container', () => {
    expect(subject.find(StyledInformationContainer).exists).toBeTruthy();
  });

  it('should render a operations container', () => {
    expect(subject.find(StyledOperationContainer).exists()).toBeTruthy();
  });

  it('should have a body for the contents to go into', () => {
    expect(subject.find('.cardBody').exists()).toBeTruthy();
  });
});