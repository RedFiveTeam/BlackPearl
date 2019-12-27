import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MetricsPage } from './MetricsPage';
import { MetricsStore } from './stores/MetricsStore';
import { StubMetricRepository } from '../component/metrics/metric/StubMetricRepository';
import Mock = jest.Mock;

describe('MetricsPage', () => {
  let subject: ReactWrapper;
  let metricsStore: MetricsStore;
  let metricsPageActions: any;
  let metricActions: any;
  let initSpy: Mock;

  beforeEach(async () => {
    initSpy = jest.fn();

    metricsPageActions = {
      initializeStores: initSpy,
      exportLogins: jest.fn(),
      buildMetrics: jest.fn()
    };

    metricActions = {
      logMetric: jest.fn()
    };

    metricsStore = new MetricsStore();
    await metricsStore.hydrate(new StubMetricRepository());

    subject = mount(
      <MetricsPage
        metricsPageActions={metricsPageActions}
        metricsStore={metricsStore}
        metricActions={metricActions}
      />
    );
  });

  it('should display the number of users', () => {
    expect(subject.find('.metric-value--usersCounter').text()).toBe('12');
  });

  it('should display the number of visits', () => {
    expect(subject.find('.metric-value--visitCounter').text()).toBe('3');
  });

  it('should display the number of resources clicked', () => {
    expect(subject.find('.metric-value--resourceCounter').text()).toBe('30');
  });

  it('should display the number of widgets used', () => {
    expect(subject.find('.metric-value--widgetCounter').text()).toBe('15');
  });

  it('should display the top 5 resources clicked', () => {
    expect(subject.find('.top-resource').length).toBe(5);
    expect(subject.find('.top-resource--name').at(0).text()).toBe('1. top resource 1');
    expect(subject.find('.top-resource--clicks').at(0).text()).toBe('11111 Clicks');
    expect(subject.find('.top-resource--name').at(4).text()).toBe('5. top resource 5');
    expect(subject.find('.top-resource--clicks').at(4).text()).toBe('5 Clicks');
  });

  it('should display the top 5 actions done', () => {
    expect(subject.find('.top-action').length).toBe(5);
    expect(subject.find('.top-action--name').at(0).text()).toBe('1. top actions 1');
    expect(subject.find('.top-action--clicks').at(0).text()).toBe('11111 Clicks');
    expect(subject.find('.top-action--name').at(4).text()).toBe('5. top actions 5');
    expect(subject.find('.top-action--clicks').at(4).text()).toBe('5 Clicks');
  });

  it('should display the most recent actions', () => {
    expect(subject.find('.recentActions').exists()).toBeTruthy();
    expect(subject.find('.metric-row').length).toBe(50);
  });

  it('should export user logins as a text file', () => {
    subject.find('.exportButton').simulate('click');
    expect(metricsPageActions.exportLogins).toHaveBeenCalled();
  });
});