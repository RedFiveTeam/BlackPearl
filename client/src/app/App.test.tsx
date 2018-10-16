import * as React from 'react';
import { App, WrappedRoutes } from './App';
import { shallow, ShallowWrapper } from 'enzyme';
import { StyledAppBanner } from './component/AppBanner';

describe('App', () => {
  let subject: ShallowWrapper;
  let resourceStore: any;

  beforeEach(() => {
    subject = shallow(<App resourceStore={resourceStore}/>);
  });

  it('should have wrapped routes', () => {
    expect(subject.find(WrappedRoutes).exists()).toBeTruthy();
  });

  it('should have a header', () => {
    expect(subject.find(StyledAppBanner).exists()).toBeTruthy();
  });
});