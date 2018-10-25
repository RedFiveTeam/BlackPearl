import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { TimeStore } from '../../../utils/time/TimeStore';

interface Props {
  className?: string;
  timeStore?: TimeStore;
}

@observer
export class ATODay extends React.Component<Props> {
  render() {
    return (
      <span className={this.props.className + ' atoDay'}>
          {this.props.timeStore!.atoDay}
      </span>
    );
  }
}

export const StyledATODay = inject('timeStore')(styled(ATODay)``);