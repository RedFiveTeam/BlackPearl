import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Resource } from './Resource';
import { PearlIcon } from '../icon/PearlIcon';

describe('Resource', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <Resource
        name="Google"
        url="http://google.com"
        className="resource"
      />
    );
  });

  it('should render a list of links', () => {
    expect(subject.find('.resource').length).toBe(1);
    expect(subject.find('.title').at(0).text()).toBe('Google');
    expect(subject.find('.resource').at(0).html()).toContain('href="http://google.com"');
  });

  it('should render a pearl icon', () => {
    expect(subject.find(PearlIcon).exists()).toBeTruthy();
  });
});