import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { OperationActions } from './actions/OperationActions';
import { StyledOperationCard } from './OperationCard';

interface Props {
  className?: string;
  operationActions?: OperationActions;
}

@observer
export class OperationContainer extends React.Component<Props> {
  async componentDidMount() {
    await this.props.operationActions!.setupOperations();
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledOperationCard/>
      </div>
    );
  }
}

export const StyledOperationContainer = inject('operationActions')(styled(OperationContainer)`
display: flex;
position: relative;
width: 100%;
margin-bottom: 10px;
`);