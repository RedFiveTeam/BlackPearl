import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { EditButton } from './EditButton';
import { EditIcon } from '../../icon/EditIcon';

describe('Edit Button', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {

    subject = shallow(
      <EditButton
        onClick={() => null}
        className={'nameMe'}
      />
    );
  });

  it('should render a edit icon', () => {
    expect(subject.find(EditIcon).exists()).toBeTruthy();
  });
});