import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { MetricsStore } from './stores/MetricsStore';
import { MetricsPageActions } from './actions/MetricsPageActions';
import { LogableActions } from '../component/metrics/metric/MetricModel';
import { MetricActions } from '../component/metrics/metric/MetricActions';
import * as moment from 'moment';
import { DisplayInformationModel, DisplayUserModel } from '../component/metrics/metric/MetricDisplayModel';
import { DropdownIcon } from '../icon/DropdownIcon';
import { ClockIcon } from '../icon/ClockIcon';
import { observable } from 'mobx';

interface Props {
  metricsPageActions?: MetricsPageActions;
  metricsStore?: MetricsStore;
  metricActions?: MetricActions;
  className?: string;
}

@observer
export class MetricsPage extends React.Component<Props> {

  @observable
  selectValue: number = 9007199254740991;
  selectText: string = 'All Time';

  async componentDidMount() {
    await this.props.metricsPageActions!.initializeStores();
    await this.props.metricActions!.logMetric(LogableActions.VISIT, 'Metrics');
    await this.props.metricsPageActions!.buildMetrics(9007199254740991);
  }

  async sortSelected(e: any) {
    this.selectValue = e.target.value;
    this.selectText = (document.querySelector('option:checked') as HTMLElement).innerHTML;
    await this.props.metricsPageActions!.buildMetrics(this.selectValue);
  }

  getResourcesClicked() {
    if (this.props.metricsStore!.displayData.resources.length > 0) {
      let clickArray = this.props.metricsStore!.displayData.resources.map((r: DisplayInformationModel) => {
        return r.clicks;
      });

      if (clickArray.length > 0) {
        return clickArray.reduce((count, curr) => {
          return count + curr;
        });
      }
    }

    return 0;
  }

  getTotalVisits() {
    if (this.props.metricsStore!.displayData.users.length > 0) {
      let countArray = this.props.metricsStore!.displayData.users.map((u: DisplayUserModel) => {
        return u.logins;
      });

      if (countArray.length > 0) {
        return countArray.reduce((count, curr) => {
          return count + curr;
        });
      }
    }
    return 0;
  }

  getWidgetsUsed() {
    if (this.props.metricsStore!.displayData.actions.length > 0) {
      let clickArray = this.props.metricsStore!.displayData.actions.filter((a: DisplayInformationModel) => {
        return (
          a.name === 'Find Acronym'
          || a.name === 'Convert Coordinates'
          || a.name === 'Click Weather'
        );
      }).map((a: DisplayInformationModel) => {
        return a.clicks;
      });

      if (clickArray.length > 0) {
        return clickArray.reduce((count, curr) => {
          return count + curr;
        });
      }
    }
    return 0;
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="pageTitle">Metrics</div>
        <div className="pageBody">
          <button
            onClick={(e) => {
              this.props.metricsPageActions!.exportLogins(this.selectValue);
            }}
            className="exportButton"
          >
            EXPORT {this.selectText.toUpperCase()} AS .CSV
          </button>
          <div className="sortSection">
            <div className="clock">
              <ClockIcon/>
            </div>
            Time Frame:
            <select
              defaultValue="All Time"
              className="sortSelector"
              onChange={async (e) => {
                await this.sortSelected(e);
              }}
            >
              <option value={9007199254740991}>All Time</option>
              <option value={60 * 60 * 24}>Last 24 Hours</option>
              <option value={60 * 60 * 24 * 3}>Last 72 Hours</option>
              <option value={60 * 60 * 24 * 7}>Last 7 Days</option>
              <option value={60 * 60 * 24 * 30}>Last 30 Days</option>
            </select>
            <DropdownIcon/>
          </div>
          <div className="counters">
            <div
              className="usersCounter counter"
            >
              <div className="number">
                {this.props.metricsStore!.displayData ? this.props.metricsStore!.displayData.users.length : 0}
              </div>
              <div className="title">Total User Accounts</div>
            </div>
            <div
              className="visitCounter counter"
            >
              <div className="number">
                {
                  this.props.metricsStore!.displayData ? this.getTotalVisits() : 0
                }
              </div>
              <div className="title">Total Visits</div>
            </div>
            <div
              className="resourceCounter counter"
            >
              <div className="number">
                {
                  this.props.metricsStore!.displayData &&
                  this.getResourcesClicked()
                }
              </div>
              <div className="title">Resources Clicked</div>
            </div>
            <div
              className="widgetCounter counter"
            >
              <div className="number">
                {
                  this.props.metricsStore!.displayData &&
                  this.getWidgetsUsed()
                }
              </div>
              <div className="title">Widgets Used</div>
            </div>
          </div>
          <div className="topRow">
            <div
              className="topResources"
            >
              <div className="topTitle">Top Resources</div>
              <div className="topList">
                {
                  this.props.metricsStore!.displayData && this.props.metricsStore!.displayData.resources.length > 0 ?
                    this.props.metricsStore!.displayData.resources.slice().sort((a, b) => {
                      return b.clicks - a.clicks;
                    }).slice(0, 5).map((r, index) => {
                      return <div className="topItem" key={index}>
                        <div>{(index + 1) + '. ' + r.name}</div>
                        <div className="spacer"/>
                        <div>{r.clicks} Clicks</div>
                      </div>;
                    }) : 'No Data Available'
                }
              </div>
            </div>
            <div
              className="topActions"
            >
              <div className="topTitle">Top Actions</div>
              <div className="topList">
                {
                  this.props.metricsStore!.displayData && this.props.metricsStore!.displayData.actions.length > 0 ?
                    this.props.metricsStore!.displayData.actions.slice().sort((a, b) => {
                      return b.clicks - a.clicks;
                    }).slice(0, 5).map((a, index) => {
                      return <div className="topItem" key={index}>
                        <div>{(index + 1) + '. ' + a.name}</div>
                        <div className="spacer"/>
                        <div>{a.clicks} Clicks</div>
                      </div>;
                    }) : 'No Data Available'
                }
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
                this.props.metricsStore!.logins.slice().reverse().slice(0, 50).map((l, index) => {
                  return (
                    <tr
                      key={index}
                    >
                      <td>{l.cardID.split('.')[1] + ' ' + l.cardID.split('.')[0]}</td>
                      <td>{l.action}</td>
                      <td>{l.context}</td>
                      <td>{moment.unix(l.time).format('MMMM D, YYYY HHmm')}L</td>
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
    color: #FFFFFF;
    outline: none;
    width: auto;
  }
  
  .pageTitle {
    color: #FFFFFF;
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
    color: #fff;
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
    left: 0px;
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
    left: 0px;
    width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .topItem > div:nth-of-type(3) {
    position: relative;
    margin-left: 20px;
    bottom: 8px;
    position: relative;
  }
  
  .number {
    font-size: 64px;
    color: #fff;
  }
  
  .counter {
    display: inline-block;
    text-align: center;
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
    padding: 0px;
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