import * as React from 'react';
import { StyledResourceList } from '../../resource/ResourceList';
import { shallow, ShallowWrapper } from 'enzyme';
import { Card } from './Card';
import { StyledAddResourceButton } from '../button/AddResourceButton';

describe('Card', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <Card
        title="Test"
      />
    );
  });

  it('should render a resource list', () => {
    expect(subject.find(StyledResourceList).exists()).toBeTruthy();
  });

  it('should render a add resource button', () => {
    expect(subject.find(StyledAddResourceButton).exists()).toBeTruthy();
  });

  it('should have a title', () => {
    expect(subject.find('.cardTitle').text()).toBe('Test');
  });
});