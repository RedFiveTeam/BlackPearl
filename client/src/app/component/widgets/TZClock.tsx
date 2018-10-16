import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { TimeActions } from '../../utils/TimeActions';
import { TimeStore } from '../../utils/TimeStore';

interface Props {
  className?: string;
  title: string;
  timeZone: string;
  timeActions?: TimeActions;
  timeStore?: TimeStore;
}

@observer
export class TZClock extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className + ' clock'}
      >
        <div
          className="title"
        >
          {this.props.title}
        </div>
        <div
          className="time"
        >
          {this.props.timeActions!.returnCurrentTime(this.props.timeStore!.time, this.props.timeZone)}
        </div>
      </div>
    );
  }
}

export const StyledTZClock = inject('timeActions', 'timeStore')(styled(TZClock)`
text-align: center;
margin-right: 10px;
`);