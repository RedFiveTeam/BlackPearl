import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { MetricsStore } from './stores/MetricsStore';
import { MetricsPageActions } from './actions/MetricsPageActions';
import { LogableActions, MetricModel } from '../component/metrics/metric/MetricModel';
import { MetricActions } from '../component/metrics/metric/MetricActions';
import * as moment from 'moment';
import Metric from './Metric';
import classNames = require('classnames');

interface Props {
  metricsPageActions?: MetricsPageActions;
  metricsStore?: MetricsStore;
  metricActions?: MetricActions;
  className?: string;
}

@observer
export class MetricsPage extends React.Component<Props> {
  async componentDidMount() {
    await this.props.metricsPageActions!.initializeStores();
    await this.props.metricsPageActions!.buildDisplayableMetrics();
    await this.props.metricActions!.logMetric(LogableActions.VISIT, 'Metrics');
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="pageTitle">Metrics</div>
        <div className="pageBody">
          <button
            onClick={async (e) => {
              await this.props.metricsPageActions!.exportLogins();
            }}
            className="exportButton"
          >
            Export All Actions As .CSV
          </button>
          <div className="counters">
            <Metric
              className={'usersCounter'}
              title={'Total User Accounts'}
              value={this.props.metricsStore!.userCount}
            />
            <Metric
              className={'visitCounter'}
              title={'Total  Visits'}
              value={this.props.metricsStore!.visitCount}
            />
            <Metric
              className={'resourceCounter'}
              title={'Resources Clicked'}
              value={this.props.metricsStore!.resourceClickCount}
            />
            <Metric
              className={'widgetCounter'}
              title={'Widgets Used'}
              value={this.props.metricsStore!.widgetUseCount}
            />
          </div>
          <div className="topRow">
            <div
              className="topResources"
            >
              <div className="topTitle">Top Resources</div>
              <div className="topList">
                {this.renderTopResources()}
              </div>
            </div>
            <div
              className="topActions"
            >
              <div className="topTitle">Top Actions</div>
              <div className="topList">
                {this.renderTopActions()}
              </div>
            </div>
          </div>
          <div
            className="recentActions"
          >
            <table>
              <tbody>
              <tr>
                <td>Users</td>
                <td>Action</td>
                <td>Context</td>
                <td>Time</td>
              </tr>
              {
                this.props.metricsStore!.latestActions.map(
                  (action: MetricModel, index: number) => {
                    return (
                      <tr
                        key={index}
                        className={'metric-row'}
                      >
                        <td>{action.cardID}</td>
                        <td>{action.action}</td>
                        <td>{action.context}</td>
                        <td>{moment.unix(action.time).format('MMMM D, YYYY HHmm')}L</td>
                      </tr>
                    );
                  })
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  private renderTopResources() {
    return this.props.metricsStore!.topResources.map((resource: any, index: number) => {
      return (
        <div className={classNames('top-resource', 'topItem')} key={index}>
          <div className={'top-resource--name'}>
            {(index + 1) + '. ' + resource.name}
          </div>
          <div className={'spacer'}/>
          <div className={'top-resource--clicks'}>
            {resource.clicks} Clicks
          </div>
        </div>
      );
    });
  }

  private renderTopActions() {
    return this.props.metricsStore!.topActions.map((action: any, index: number) => {
      return (
        <div className={classNames('top-action', 'topItem')} key={index}>
          <div className={'top-action--name'}>
            {(index + 1) + '. ' + action.name}
          </div>
          <div className="spacer"/>
          <div className={'top-action--clicks'}>
            {action.clicks} Clicks
          </div>
        </div>
      );
    });
  }
}

export const StyledMetricsPage = inject('metricsPageActions', 'metricsStore', 'metricActions')(styled(MetricsPage)`

  .sortSection {
    position: absolute;
    top: 15px;
    margin-left: 17px;
    font-size: 14px;
    .dropIcon {
      pointer-events: none;
      position: relative;
      top: 1px;
      width: 10px;
      height: 10px;
      margin-left: -20px;
    }
  }
  
  .clock {
    display: inline-block;
    margin-right: 5px;
    position: relative;
    top: 6px;
    
    svg > path {
      fill: #93A7C3;
    }
  }
  
   option {
    color: #000;
   }
    
  .sortSelector {
    position: relative;
    border: none;
    border-radius: 4px;
    text-align: center;
    -webkit-appearance: none;
    margin-left: 5px;
    background: none;
    padding-right: 25px;
    color: #FFF;
    outline: none;
    width: auto;
  }
  
  .pageTitle {
    color: #FFF;
    font-size: 48px;
    margin: 20px 0 20px 74px;
  }
  
  .pageBody{
    margin: auto auto 20px auto;
    background: #1F2226;
    color: #93A6C2;
    position: relative;
    width: 90%;
    min-width: 1503px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
  }
  
  .topTitle {
    font-size: 30px;
    color: #FFF;
    margin-bottom: 8px;
  }
  
  .topResources {
    position: relative;
    display: inline-block;
    margin-right: 7%;
  }
  
  .topActions {
    position: relative;
    display: inline-block;
    margin-left: 7%;
  }
  
  .spacer {
    position: relative;
    left: 0;
    bottom: 3px;
    height: 22px;
    border-left: 1px solid #686868;
  }
  
  .topItem {
    position: relative;
    width: 475px;
    font-size: 18px;
    white-space: nowrap;
    line-height: 28px;
  }
  
  .topRow {
    margin-top: 55px;
    display: flex;
    justify-content: center;
  }
  
  .topItem > div {
    display: inline-block;
  }
  
  .topItem > div:first-of-type {
    position: relative;
    left: 0;
    width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .topItem > div:nth-of-type(3) {
    position: relative;
    margin-left: 20px;
    bottom: 8px;
  }
 
  
  .counters {
    display: flex;
    margin: auto;
    width: 90%;
    justify-content: space-evenly;
    padding-bottom: 30px;
    padding-top: 109px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  }
  
  .title {
    font-size: 24px;
  }
  
  .exportButton {
    position: absolute;
    right: 33px;
    top: 28px;
    font-size: 14px;
    background: none;
    border: none;
    color: #76ADED;
    cursor: pointer;
  }
  
  table {
    width: 90%;
    margin: auto;
    table-layout: fixed;
  }
  
  td {
    padding: 0;
    font-size: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  td:nth-of-type(1) {
    width: 30%;
  }
  
  td:nth-of-type(2) {
    width: 23%;
  }
  
  td:nth-of-type(3) {
    width: 30%;
  }
  
  tr:first-of-type > td {
    padding-top: 73px;
    color: #FFFFFF;
    font-size: 36px;
  }
  
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) { /* For Internet Exploder */
    .counter {
       padding-left: 5%;
    }
    
    .counter:first-of-type {
      padding-left: 17%;
    }
    
    .dropIcon {
      display: none;
    }
  }
`);
