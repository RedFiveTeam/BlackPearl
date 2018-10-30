import * as React from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import { StyledATODay } from './ATODay';
import { TimeStore } from '../../../utils/time/TimeStore';
import { TimeActions } from '../../../utils/time/TimeActions';
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
        <StyledATODay className="atoDay"/>
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
  display: flex;
  
  .timeBanner {
      background: #EAEAEA;
      width: 340px;
      height: 37px;
      box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
      display: flex;
      justify-content: space-between;
      font-family: Amaranth;
      padding-left: 10px;
      align-self: flex-end;
      margin-left: 10px;
      position: relative;
      bottom: 6px;
      border-radius: 10px;
  }
  
  .atoDay {
    position: absolute;
    right: 124px;
    height: 46px;
    font-size: 36px;
    font-family: Amaranth;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
    padding-top: 25px;
  }
`);