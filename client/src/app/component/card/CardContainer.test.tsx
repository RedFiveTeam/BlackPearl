import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CardContainer } from './CardContainer';
import { StyledCard } from './Card';
import { Category } from '../../resource/ResourceModel';

describe('CardContainer', () => {
  let subject: ShallowWrapper;
  let resourceActions: any;

  beforeEach(() => {
    resourceActions = {
      setAllResources: jest.fn()
    };

    subject = shallow(
      <CardContainer
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

});