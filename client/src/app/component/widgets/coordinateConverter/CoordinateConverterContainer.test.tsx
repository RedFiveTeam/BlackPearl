import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CoordinateConverterContainer } from './CoordinateConverterContainer';
import { DownArrow, UpArrow } from '../../../icon/ConversionArrow';

describe('CoordinateConverterContainer', () => {
  let subject: ShallowWrapper;
  let coordinateConverterActions: any;
  let coordinateConverterStore: any;

  beforeEach(() => {
    coordinateConverterActions = {
      convertToMGRS: jest.fn(),
      convertToLatLong: jest.fn()
    };

    coordinateConverterStore = {
      mgrs: jest.fn(),
      latLong: '123456N 1234567E'
    };

    subject = shallow(
      <CoordinateConverterContainer
        coordinateConverterActions={coordinateConverterActions}
        coordinateConverterStore={coordinateConverterStore}
      />
    );
  });

  it('should have a div', () => {
    expect(subject.find('div').exists).toBeTruthy();
  });

  it('should have a latLong input tag', () => {
    expect(subject.find('.latLongInput').exists()).toBeTruthy();
  });

  it('should have an mgrs input tag', () => {
    expect(subject.find('.mgrsInput').exists()).toBeTruthy();
  });

  it('should trigger a conversion on typing in text input', () => {
    subject.find('.latLongInput').simulate('change', {target: {value: 'foo'}});
    expect(coordinateConverterActions.convertToMGRS).toHaveBeenCalledWith('foo');
  });

  it('should convert MGRS to lat/long', () => {
    subject.find('.mgrsInput').simulate('change', {target: {value: 'mgrs'}});
    expect(coordinateConverterActions.convertToLatLong).toHaveBeenCalledWith('mgrs');
  });

  it('should display a latlong value from the store', () => {
    expect(subject.find('.latLongInput').prop('value')).toBe('123456N 1234567E');
  });

  it('should contain two, strictly cosmetic, arrows', () => {
    expect(subject.find(DownArrow).exists()).toBeTruthy();
    expect(subject.find(UpArrow).exists()).toBeTruthy();
  });
});