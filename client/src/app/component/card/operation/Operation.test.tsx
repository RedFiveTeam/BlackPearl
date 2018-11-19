import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Operation } from './Operation';

describe('Operation', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <Operation
        title="My Operation"
        description="This is my Operation!"
        address="https://www.thisismyop.com"
      />
    );
  });

  it('should render an operation title', () => {
    expect(subject.find('.title').text()).toBe('My Operation');
  });

  it('should render an operation description', () => {
    expect(subject.find('.description').text()).toBe('This is my Operation!');
  });

  it('should render and address', () => {
    expect(subject.find('.address').prop('href')).toBe('https://www.thisismyop.com');
  });
});