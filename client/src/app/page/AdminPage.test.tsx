import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AdminPage } from './AdminPage';
import { StyledAdminCardContainer } from '../component/card/admin/AdminCardContainer';

describe('AdminPage', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<AdminPage/>);
  });

  it('should render an Admin Card Container', () => {
    expect(subject.find(StyledAdminCardContainer).exists()).toBeTruthy();
  });

});