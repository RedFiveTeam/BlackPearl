import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  className?: string;
  title: string;
  time: string;
}

@observer
export class TZClock extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.className + ' clock'}>
        <div className="title">
          {this.props.title}
        </div>
        <div className="time">
          {this.props.time}
        </div>
      </div>
    );
  }
}

export const StyledTZClock = inject('adminActions', 'adminStore')(styled(TZClock)`
  text-align: center;
  margin-right: 10px;

  .title {
    font-size: 12px;
    padding-top: 2px;
    margin-bottom: -5px;
    overflow: hidden;
    white-space: nowrap;
    max-width: 60px;
  }

  .time {
    font-size: 20px;
  }
`);