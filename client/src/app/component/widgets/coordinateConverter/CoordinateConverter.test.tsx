import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CoordinateConverter } from './CoordinateConverter';

describe('CoordinateConverter', () => {
  let subject: ShallowWrapper;
  let mgrsFunction: any;
  let latLongFunction: any;
  let metricActions: any;

  beforeEach(() => {
    metricActions = {
      logMetric: jest.fn()
    };

    mgrsFunction = jest.fn();
    latLongFunction = jest.fn();

    subject = shallow(
      <CoordinateConverter
        mgrs={'12ABC123456789'}
        mgrsFunction={mgrsFunction}
        latLong={'123456N 1234567E'}
        latLongFunction={latLongFunction}
        metricActions={metricActions}
      />
    );
  });

  it('should have a latLong input tag', () => {
    expect(subject.find('.latLongInput').exists()).toBeTruthy();
    expect(subject.find('.latLongInput').props().value).toBe('123456N 1234567E');
  });

  it('should have an mgrs input tag', () => {
    expect(subject.find('.mgrsInput').exists()).toBeTruthy();
    expect(subject.find('.mgrsInput').props().value).toBe('12ABC123456789');
  });

  it('should call mgrsFunction on change', () => {
    subject.find('.mgrsInput').simulate('change', {target: {value: 'mgrs'}});
    expect(mgrsFunction).toHaveBeenCalled();
  });

  it('should call latLongFunction on change', () => {
    subject.find('.latLongInput').simulate('change', {target: {value: 'latLong'}});
    expect(latLongFunction).toHaveBeenCalled();
  });
});