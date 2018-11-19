import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsPage } from './MetricsPage';
import Mock = jest.Mock;

describe('MetricsPage', () => {
  let subject: ShallowWrapper;
  let metricsStore: any;
  let metricsActions: any;
  let initSpy: Mock;

  beforeEach(() => {
    initSpy = jest.fn();
    metricsActions = {
      initializeStores: initSpy
  };
    metricsStore = {
      userCount: 2
    };
    subject = shallow(
      <MetricsPage
        metricsActions={metricsActions}
        metricsStore={metricsStore}
      />
    );
  });
  it('should display a title', () => {
    expect(subject.find('.users').text()).toContain('Total user accounts:');
  });

  it('should display the number of users', () => {
    expect(subject.find('.users').text()).toContain('2');
  });
});