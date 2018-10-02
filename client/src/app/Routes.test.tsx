import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Routes } from './Routes';
import { shallow } from 'enzyme';

describe('Routes', () => {
  it('should support all routes', async () => {
    const subject = shallow(<Routes />);

    expect(subject.find(Switch).children().length).toBe(1);
    expect(subject.find(Route).at(0).prop('path')).toBe('/');
  });
});