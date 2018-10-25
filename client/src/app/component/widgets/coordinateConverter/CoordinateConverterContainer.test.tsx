import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { CoordinateConverterContainer } from './CoordinateConverterContainer';

describe('CoordinateConverterContainer', () => {
  let subject: ShallowWrapper;
  let coordinateConverterActions: any;
  let coordinateConverterStore: any;

  beforeEach(() => {
    coordinateConverterActions = {
      convertToMGRS: jest.fn()
    };

    coordinateConverterStore = {
      mgrs: jest.fn()
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
});