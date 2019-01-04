import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AcronymStore } from './AcronymStore';
import { StyledAcronymRow } from './AcronymRow';
import { AcronymActions } from './actions/AcronymActions';
import { MetricActions } from '../../metrics/metric/MetricActions';
import { LogableActions } from '../../metrics/metric/MetricModel';

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
          onSelect={() => { this.props.metricActions!.logMetric(LogableActions.CLICK_ACRONYM, 'AcronymRow'); }}
          onChange={async (e) => { await this.props.acronymActions!.setFilteredAcronyms(e.target.value); }}
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
  width: 340px;
  height: 200px;
  margin-left: 7px;
  border-radius: 4px;
  margin-top: 30px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  
  .title {
    height: 42px;
    line-height: 42px;
  }
  
  .acronymSearch {
    width: 329px;
    height: 20px;
    font-size: 18px;
    outline: none;
    border: none;
    background: #292E33;
    color: #FFFFFF;
    border-bottom: 1px solid #93A7C3;
    :focus {
      border-bottom: 2px solid #6C9CD5;
    }
    ::placeholder {
      color: #93A7C3;
      font-weight: 100;
    }
  }

  .acronymList {
  height: 107px;
  width: 324px;
  overflow: auto;
  font-size: 13px;
  background: #292E33;
  text-align: left;
  color: #FFFFFF;
  margin-left: 10px;
  } 
`);