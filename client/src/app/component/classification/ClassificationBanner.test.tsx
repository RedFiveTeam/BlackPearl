import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ClassificationBanner } from './ClassificationBanner';

describe('ClassificationBanner', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow
    (
      <ClassificationBanner
        classification={'UNCLASSIFIED'}
      />
    );
  });

  it('should render a green background for UNCLASSIFIED', () => {
    expect(subject.html()).toContain('green');
  });
});
