import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Card } from './Card';
import { StyledAddResourceButton } from '../button/AddResourceButton';
import { Category, ResourceModel } from '../resource/ResourceModel';
import { StyledResourceContainer } from '../resource/ResourceContainer';

describe('Card', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <Card
        category={Category.Main}
        resources={[
          new ResourceModel(1, 'https://www.test.com', 'Test', 1, 'Bob')
        ]}
      />
    );
  });

  it('should render a resource list with a list of resources', () => {
    expect(subject.find(StyledResourceContainer).exists()).toBeTruthy();
  });

  it('should render a add resource button', () => {
    expect(subject.find(StyledAddResourceButton).exists()).toBeTruthy();
  });

  it('should have a title', () => {
    expect(subject.find('.cardTitle').text()).toBe('Main');
  });

  it('should have a className equal to its category', () => {
    expect(subject.find('.category' + Category.Main).exists()).toBeTruthy();
  });
});