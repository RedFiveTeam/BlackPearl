import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CoordinateConverterContainer } from './CoordinateConverterContainer';
import { StyledCoordinateConverter } from './CoordinateConverter';

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
      latLong: jest.fn()
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

  it('should have a coordinate converter', () => {
    expect(subject.find(StyledCoordinateConverter).exists()).toBeTruthy();
  });

  it('should convert latLong to mgrs', () => {
    (subject.instance() as CoordinateConverterContainer).latLongFunction({target: {value: 'lulwut'}});
    expect(coordinateConverterActions.convertToMGRS).toHaveBeenCalledWith('lulwut');
  });

  it('should convert MGRS to lat/long', () => {
    (subject.instance() as CoordinateConverterContainer).mgrsFunction({target: {value: 'lulwut'}});
    expect(coordinateConverterActions.convertToLatLong).toHaveBeenCalled();
  });
});