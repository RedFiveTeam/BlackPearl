import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ThreeDotButton } from './ThreeDotButton';
import { ThreeDotIcon } from '../../icon/ThreeDotIcon';
import { ResourceModel } from '../../resource/ResourceModel';

describe('ThreeDotButton', () => {
  let subject: ShallowWrapper;
  let resource: ResourceModel;

  beforeEach(() => {
    resource = new ResourceModel();

    subject = shallow(
      <ThreeDotButton
        onClick={jest.fn()}
        resource={resource}
      />
    );
  });

  it('should render three dot icon', () => {
    expect(subject.find(ThreeDotIcon).exists()).toBeTruthy();
  });
});