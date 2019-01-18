import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AcronymStore } from './AcronymStore';
import { StyledAcronymRow } from './AcronymRow';
import { AcronymActions } from './actions/AcronymActions';
import { MetricActions } from '../../metrics/metric/MetricActions';
import { LogableActions } from '../../metrics/metric/MetricModel';
import * as ReactDOM from 'react-dom';

interface Props {
  acronymStore?: AcronymStore;
  acronymActions?: AcronymActions;
  metricActions?: MetricActions;
  className?: string;
}

@observer
export class AcronymContainer extends React.Component<Props> {
  async componentDidMount() {
    await this.props.acronymActions!.setAllAcronyms();
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="title">Acronym Search</div>
        <input
          className="acronymSearch"
          placeholder="Acronym"
          onClick={async () => {
            await this.props.metricActions!.logMetric(LogableActions.CLICK_ACRONYM, 'AcronymRow');
          }}
          onChange={
            async (e) => {
              let ele = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('.acronymList') as HTMLElement;
              if (ele) {
                if (e.target.value === '') {
                  (ReactDOM.findDOMNode(this) as HTMLElement).style.height = '120px';
                  ele.style.height = '27px';
                } else {
                  (ReactDOM.findDOMNode(this) as HTMLElement).style.height = '350px';
                  ele.style.height = '261px';
                }
                await this.props.acronymActions!.setFilteredAcronyms(e.target.value);
              }
            }
          }
        />
        <div className="acronymList">
          {
            this.props.acronymStore!.filteredAcronyms &&
            this.props.acronymStore!.filteredAcronyms.map((acronym, index) => {
              return (
                <StyledAcronymRow
                  acronym={acronym}
                  key={index}
                  className="acronym"
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export const StyledAcronymContainer = inject('acronymStore', 'acronymActions', 'metricActions')
(styled(AcronymContainer)`
  text-align: center;
  font-size: 24px;
  color: #FFFFFF;
  background: #292E33;
  width: 95%;
  height: 120px;
  transition: height ease-in 0.5s;
  border-radius: 4px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  margin: auto;
  
  .title {
    height: 42px;
    line-height: 42px;
  }
  
  .acronymSearch {
    width: 90%;
    height: 20px;
    font-size: 18px;
    outline: none;
    border: none;
    background: #292E33;
    color: #FFFFFF;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    :focus {
      border-bottom: 1px solid #6C9CD5;
    }
    ::placeholder {
      color: rgba(255, 255, 255, 0.2);
      font-weight: 100;
    }
  }

  .acronymList {
  height: 27px;
  width: 90%;
  overflow: auto;
  font-size: 13px;
  background: #292E33;
  text-align: left;
  color: #FFF;
  margin-left: 10px;
  transition: height ease-in 0.5s;
  } 
`);