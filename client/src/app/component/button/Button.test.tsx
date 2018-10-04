import * as React from 'react';
import { Button } from './Button';
import { shallow, ShallowWrapper } from 'enzyme';

describe('Button', () => {
  let subject: ShallowWrapper;
  let jestFunction: any;
  let buttonText: string;

  beforeEach(() => {

    jestFunction = jest.fn();
    buttonText = 'Click Me!';

    subject = shallow(
      <Button
        text={buttonText}
        onClick={jestFunction}
      />
    );
  });

  it('should render a button with text', () => {
    expect(subject.text()).toEqual(buttonText);
  });

  it('should run a function when clicked', () => {
    subject.simulate('click');
    expect(jestFunction).toHaveBeenCalled();
  });
});