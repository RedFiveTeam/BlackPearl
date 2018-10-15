import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { TimeActions } from '../../utils/TimeActions';

interface Props {
  className?: string;
  timeActions?: TimeActions;
}

@observer
export class ATODay extends React.Component<Props> {
  render() {

    return (
      <span
        className={this.props.className + ' atoDay'}
      >
          {this.props.timeActions!.returnATODay()}
      </span>
    );
  }
}

export const StyledATODay = inject('timeActions')(styled(ATODay)`
  margin-right: 5px;
`);