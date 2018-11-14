import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CardContainer } from './CardContainer';
import { StyledCard } from './Card';
import { Category } from '../resource/ResourceModel';
import { StyledInformationContainer } from './information/InformationContainer';

describe('CardContainer', () => {
  let subject: ShallowWrapper;
  let resourceActions: any;
  let profileActions: any;

  beforeEach(() => {
    resourceActions = {
      setAllResources: jest.fn()
    };

    profileActions = {
      setProfile: jest.fn()
    };

    subject = shallow(
      <CardContainer
        profileActions={profileActions}
        resourceActions={resourceActions}
      />
    );
  });

  it('should have a card for each card category', () => {
    expect(subject.find(StyledCard).length).toBe(3);
    expect(subject.find(StyledCard).at(0).prop('category')).toBe(Category.Main);
    expect(subject.find(StyledCard).at(1).prop('category')).toBe(Category.SituationalAwareness);
    expect(subject.find(StyledCard).at(2).prop('category')).toBe(Category.TargetResearch);
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

});