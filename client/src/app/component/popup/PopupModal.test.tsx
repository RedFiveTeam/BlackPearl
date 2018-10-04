import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { PopupModal } from './PopupModal';

describe('PopupModal', () => {
  let subject: ShallowWrapper;
  let cancelFunction: () => void;
  let title: string;

  beforeEach(() => {
    cancelFunction = jest.fn();
    title = 'Title';

    subject = shallow(
      <PopupModal
        onCancel={cancelFunction}
        title={title}
      />
    );
  });

  it('should close when cancel is clicked', () => {
    subject.find('.cancelButton').simulate('click');
    expect(cancelFunction).toHaveBeenCalled();
  });

  it('should render a title for the cancel button', () => {
    expect(subject.find('.cancelButton').text()).toBe('CANCEL');
  });

  it('should render a title for the popup', () => {
    expect(subject.find('.title').text()).toBe(title);
  });
});