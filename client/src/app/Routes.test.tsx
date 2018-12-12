import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Routes } from './Routes';
import { shallow } from 'enzyme';

describe('Routes', () => {
  it('should support all routes', async () => {
    const subject = shallow(<Routes />);

    expect(subject.find(Switch).children().length).toBe(6);
    expect(subject.find(Route).at(0).prop('path')).toBe('/');
    expect(subject.find(Route).at(1).prop('path')).toBe('/admin');
    expect(subject.find(Route).at(2).prop('path')).toBe('/poopdeck');
    expect(subject.find(Route).at(3).prop('path')).toBe('/gifford');
    expect(subject.find(Route).at(4).prop('path')).toBe('/metrics');
    expect(subject.find(Route).at(5).prop('path')).toBe('/*');
  });
});