import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ThreeDotButton } from './ThreeDotButton';
import { ThreeDotIcon } from '../../icon/ThreeDotIcon';
import { StyledButton } from './Button';

describe('ThreeDotButton', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {

    subject = shallow(
      <ThreeDotButton
        onClick={jest.fn()}
        className={'unique'}
      />
    );
  });

  it('should render three dot icon', () => {
    expect(subject.find(ThreeDotIcon).exists()).toBeTruthy();
  });

  it('should render a button with a unique className', () => {
    expect(subject.find(StyledButton).prop('className')).toBe('threeDotButton unique');
  });
});