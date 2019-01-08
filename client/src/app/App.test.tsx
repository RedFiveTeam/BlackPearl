import * as React from 'react';
import { App, WrappedRoutes } from './App';
import { shallow, ShallowWrapper } from 'enzyme';

describe('App', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<App/>);
  });

  it('should have wrapped routes', () => {
    expect(subject.find(WrappedRoutes).exists()).toBeTruthy();
  });
});