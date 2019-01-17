import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { TimeStore } from './TimeStore';
import { TimeActions } from './actions/TimeActions';
import { StyledTZClock } from './TZClock';

interface Props {
  className?: string;
  timeStore?: TimeStore;
  timeActions?: TimeActions;
}

@observer
export class TimeContainer extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.className}>
        <div className="timeBanner">
          {
            this.props.timeStore!.time &&
            this.props.timeStore!.zones.map((obj: any) => {
              return (
                <StyledTZClock
                  key={obj.id}
                  title={obj.name}
                  time={this.props.timeActions!.returnCurrentTime(this.props.timeStore!.time, obj.zone)}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export const StyledTimeContainer = inject('timeStore', 'timeActions')(styled(TimeContainer)`
  display: block;
  
  .timeBanner {
      height: 53px;
      display: flex;
      justify-content: space-between;
      font-family: "Avenir Next";
      font-size: 36px;
      color: #F2F2F2;
      align-items: center;
  }
  
  .title {
  color: #93A7C3;
  font-size: 12px;
  margin-right: 5px;
  }
  
  .time {
  font-size: 16px;
  margin-top: 6px;
  margin-right: 5px;
  }
`);