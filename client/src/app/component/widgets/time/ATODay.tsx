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
width: 175px;
text-align: center;
margin-top: 3px;

height: 53px;
font-size: 36px;
text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
font-family: "Avenir Next";
font-size: 36px;
`);