import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<NotFoundPage/>);
  });

  it('should render 404 text', () => {
    expect(subject.find('.title').exists()).toBeTruthy();
    expect(subject.find('.subtitle').exists()).toBeTruthy();
    expect(subject.find('.message').exists()).toBeTruthy();
  });

  it('should render a 404 ship', () => {
    expect(subject.find('.errorShip').exists()).toBeTruthy();
    expect(subject.find('.firstFour').exists()).toBeTruthy();
    expect(subject.find('.zero').exists()).toBeTruthy();
    expect(subject.find('.secondFour').exists()).toBeTruthy();
  });

  it('should render a go back button', () => {
    expect(subject.find('.goBackButton').exists()).toBeTruthy();
  });

});