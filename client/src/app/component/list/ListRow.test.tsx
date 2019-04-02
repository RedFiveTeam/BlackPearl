import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ListRow } from './ListRow';
import Mock = jest.Mock;

describe('listRow', () => {
  let subject: ShallowWrapper;
  let name: string;
  let clickSpy: Mock;

  beforeEach(() => {

    name = 'test';

    clickSpy = jest.fn();

    subject = shallow(
        <ListRow
          name={name}
          clickAction={clickSpy}
        />
    );
  });

  it('should display given text', () => {
    expect(subject.text()).toBe(name);
  });

  it('should call its given function on click', () => {
    subject.simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should have given class name', () => {
    expect(subject.hasClass('listRow')).toBeTruthy();
  });

});
