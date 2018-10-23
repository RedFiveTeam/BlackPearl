import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledATODay } from './ATODay';
import { StyledTZClock } from './TZClock';

interface Props {
  className?: string;
}

@observer
export class TimeContainer extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledATODay
          className="atoDay"
        />
        <div
          className="timeBanner"
        >
          <StyledTZClock
            title="LANGLEY"
            timeZone="America/New_York"
          />
          <StyledTZClock
            title="PACIFIC"
            timeZone="America/Los_Angeles"
          />
          <StyledTZClock
            title="CENTRAL"
            timeZone="America/Chicago"
          />
          <StyledTZClock
            title="HAWAII"
            timeZone="Pacific/Honolulu"
          />
          <StyledTZClock
            title="GERMANY"
            timeZone="Europe/Berlin"
          />
          <StyledTZClock
            title="ZULU"
            timeZone="Etc/UTC"
          />
        </div>
      </div>
    );
  }
}

export const StyledTimeContainer = styled(TimeContainer)`
  display: flex;
  
  .timeBanner {
      background: #EAEAEA;
      width: 340px;
      height: 37px;
      box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
      display: flex;
      justify-content: space-between;
      font-family: Alegreya Sans;
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
    font-family: Alegreya Sans;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
    padding-top: 25px;
  }
`;