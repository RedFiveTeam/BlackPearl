import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsPage } from './MetricsPage';
import Mock = jest.Mock;
import { LogableActions, MetricModel } from '../component/metrics/metric/MetricModel';
import * as moment from 'moment';

describe('MetricsPage', () => {
  let subject: ShallowWrapper;
  let metricsStore: any;
  let metricsPageActions: any;
  let metricActions: any;
  let initSpy: Mock;
  let loginTime: number;

  beforeEach(() => {
    initSpy = jest.fn();
    loginTime = moment('2018-08-22T00:00:00.000Z').utc().unix();

    metricsPageActions = {
      initializeStores: initSpy,
      exportLogins: jest.fn()
    };

    metricActions = {
      logMetric: jest.fn()
    };

    metricsStore = {
      userCount: 2,
      logins: [
        new MetricModel(1, 0, 'GUEST.GUEST.GUEST.0123456789', loginTime, LogableActions.VISIT, 'Home'),
        new MetricModel(2, 0, 'GUEST.GUEST.GUEST.0123456789', loginTime, LogableActions.VISIT, 'Home'),
        new MetricModel(3, 0, 'GUEST.GUEST.GUEST.0123456789', loginTime, LogableActions.VISIT, 'Home'),
      ],
      displayData: {'users': [0, 0]}
    };

    subject = shallow(
      <MetricsPage
        metricsPageActions={metricsPageActions}
        metricsStore={metricsStore}
        metricActions={metricActions}
      />
    );
  });

  it('should display a title', () => {
    expect(subject.find('.usersCounter > .title').text()).toContain('Total User Accounts');
  });

  it('should display the number of users', () => {
    expect(subject.find('.usersCounter > .number').text()).toContain('2');
  });

  it('should display the number of visits', () => {
    expect(subject.find('.visitCounter > .title').text()).toBe('Total Visits');
  });

  it('should display the most recent actions', () => {
    expect(subject.find('.recentActions').exists()).toBeTruthy();
  });

  it('should export user logins as a text file', () => {
    subject.find('.exportButton').simulate('click');
    expect(metricsPageActions.exportLogins).toHaveBeenCalled();
  });
});