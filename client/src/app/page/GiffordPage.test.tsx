import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { GiffordPage } from './GiffordPage';

describe('GiffordPage', () => {
  let subject: ShallowWrapper;
  let metricActions: any;

  beforeEach(() => {
    metricActions = {
      logMetric: jest.fn()
    };

    subject = shallow(<GiffordPage metricActions={metricActions}/>);
  });

  it('should say thank you', () => {
    expect(subject.find('.title').text()).toBe('Thank you!');
  });

  it('should render ascii art of Col Gifford', () => {
    expect(subject.find('.gifford').exists()).toBeTruthy();
  });

  it('should render a thank you message', () => {
    expect(subject.find('.body').exists()).toBeTruthy();
  });

  it('should have a group picture', () => {
    expect(subject.find('.groupPicture').exists()).toBeTruthy();
  });

});