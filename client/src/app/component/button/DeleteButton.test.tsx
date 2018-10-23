import * as React from 'react';
import { DeleteIcon } from '../../icon/DeleteIcon';
import { shallow, ShallowWrapper } from 'enzyme';
import { DeleteButton } from './DeleteButton';

describe('Delete Button', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <DeleteButton
        onClick={() => null}
        className={'delete'}
      />
    );
  });

  it('should render a delete icon', () => {
    expect(subject.find(DeleteIcon).exists()).toBeTruthy();
  });
});