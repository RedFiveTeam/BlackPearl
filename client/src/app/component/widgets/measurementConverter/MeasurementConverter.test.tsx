import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MeasurementConverter } from './MeasurementConverter';

describe('MeasurementConverter', () => {
  let subject: ReactWrapper;

  beforeEach(() => {
    subject = mount(
      <MeasurementConverter
        conversionNumber={1}
        convertFunction={() => {
          return;
        }}
      />
    );
  });

  it('should have an input and output field for the measurements', () => {
    expect(subject.find('.conversionInput').exists()).toBeTruthy();
    expect(subject.find('.conversionOutput').exists()).toBeTruthy();
  });
});