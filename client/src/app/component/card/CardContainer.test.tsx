import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CardContainer } from './CardContainer';
import { StyledCard } from './Card';
import { Category, ResourceModel } from '../resource/ResourceModel';

describe('CardContainer', () => {
  let subject: ShallowWrapper;
  let resourceActions: any;
  let resourceStore: any;
  let profileActions: any;
  let profileStore: any;

  beforeEach(() => {
    resourceActions = {
      setAllResources: jest.fn(),
      updateGivenResources: jest.fn(),
      saveFavorite: jest.fn(),
      sortResources: jest.fn()
    };

    resourceStore = {
      returnResourcesInCategory: jest.fn(),
      activeTab: 1,
      resources: [new ResourceModel(1, '', '', 0, '', 0)],
      updateFavoritePositions: jest.fn()
    };

    profileActions = {
      setProfile: jest.fn()
    };

    profileStore = {
      profile: { cardID: 'test' }
    };

    subject = shallow(
      <CardContainer
        profileActions={profileActions}
        resourceActions={resourceActions}
        resourceStore={resourceStore}
        profileStore={profileStore}
      />
    );
  });

  it('should have a card for each card category', () => {
    expect(subject.find(StyledCard).length).toBe(4);
    expect(subject.find(StyledCard).at(0).prop('category')).toBe(Category.FMV_Main);
    expect(subject.find(StyledCard).at(1).prop('category')).toBe(Category.FMV_SituationalAwareness);
    expect(subject.find(StyledCard).at(2).prop('category')).toBe(Category.FMV_TargetResearch);
    expect(subject.find(StyledCard).at(3).prop('category')).toBe(Category.Favorites);
  });

  it('should pass the resources to each card based on category', () => {
    expect(resourceStore.returnResourcesInCategory).toHaveBeenCalledWith(Category.FMV_Main);
    expect(resourceStore.returnResourcesInCategory).toHaveBeenCalledWith(Category.FMV_SituationalAwareness);
    expect(resourceStore.returnResourcesInCategory).toHaveBeenCalledWith(Category.FMV_TargetResearch);
  });

  it('should have a card for each card category after the tab has changed', () => {
    resourceStore.activeTab = 2;
    subject.setProps({resourceStore: resourceStore});
    expect(subject.find(StyledCard).length).toBe(4);
    expect(subject.find(StyledCard).at(0).prop('category')).toBe(Category.HighAlt_Main);
    expect(subject.find(StyledCard).at(1).prop('category')).toBe(Category.HighAlt_SituationalAwareness);
    expect(subject.find(StyledCard).at(2).prop('category')).toBe(Category.HighAlt_TargetResearch);
    expect(subject.find(StyledCard).at(3).prop('category')).toBe(Category.Favorites);
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

  it('should have a body for the contents to go into', () => {
    expect(subject.find('.cardBody').exists()).toBeTruthy();
  });

  it('should update resources when reordered', async () => {
    let result = {
      draggableId: '1',
      destination: { index: 1, droppableId: 'category0' },
      source: { index: 1 }
    };

    await (subject.instance() as CardContainer).onDragEnd(result);

    expect(resourceActions.updateGivenResources).toHaveBeenCalled();
  });
});
