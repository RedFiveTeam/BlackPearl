import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { TimeStore } from './TimeStore';

interface Props {
  className?: string;
  timeStore?: TimeStore;
}

@observer
export class ATODay extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.className + ' atoDay'}>
          {this.props.timeStore!.atoDay}
      </div>
    );
  }
}

export const StyledATODay = inject('timeStore')(styled(ATODay)`
width: 360px;
height: 68px;
margin-bottom: 17px;
text-align: center;
`);