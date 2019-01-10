import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { GeneralInfoTab } from './GeneralInfoTab';
import { InformationModel } from '../../information/InformationModel';

describe('GeneralInfoTab', () => {
  let subject: ShallowWrapper;
  let adminStore: any;

  beforeEach(() => {
    adminStore = {
      pendingInformation: [
        new InformationModel(1, 'Phone Number', '123-456-7890'),
        new InformationModel(2, 'Server', 'www.com')
      ],
    };

    subject = shallow(
      <GeneralInfoTab
        adminStore={adminStore}
      />
    );
  });

  it('should have a field and label for each piece of general information', () => {
    expect(subject.find('.informationName').at(0).text()).toBe('Phone Number');
    expect(subject.find('.informationContent').at(0).find('input').props().value).toBe('123-456-7890');
    expect(subject.find('.informationName').at(1).find('.informationName').text()).toBe('Server');
    expect(subject.find('.informationContent').at(1).find('input').props().value).toBe('www.com');
  });

});