import * as React from 'react';
import { StyledResourceList } from '../../resource/ResourceList';
import { shallow, ShallowWrapper } from 'enzyme';
import { Card } from './Card';
import { StyledAddResourceButton } from '../button/AddResourceButton';
import { Category } from '../../resource/ResourceModel';

describe('Card', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {

    subject = shallow(
      <Card category={Category.Main}/>
    );
  });

  it('should render a resource list', () => {
    expect(subject.find(StyledResourceList).exists()).toBeTruthy();
  });

  it('should render a add resource button', () => {
    expect(subject.find(StyledAddResourceButton).exists()).toBeTruthy();
  });

  it('should have a title', () => {
    expect(subject.find('.cardTitle').text()).toBe('MAIN');
  });

  it('should have a className equal to its category', () => {
    expect(subject.find('.category' + Category.Main).exists()).toBeTruthy();
  });
});