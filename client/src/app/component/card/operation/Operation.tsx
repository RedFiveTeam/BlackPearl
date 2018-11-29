import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledOperationMenuContainer } from './OperationMenuContainer';
import { OperationModel } from './OperationModel';
import { OperationMenuStore } from './stores/OperationMenuStore';
import { OperationStore } from './stores/OperationStore';
import classNames = require('classnames');

interface Props {
  operation: OperationModel;
  operationStore?: OperationStore;
  className?: string;
}

interface State {
  descHeight: number;
}

@observer
export class Operation extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);
    this.state = {descHeight: ((Math.ceil(this.props.operation.description.length / 50)) * 29) + 32};
  }

  componentWillReceiveProps(props: Props) {
    this.setState({descHeight: ((Math.ceil(props.operation.description.length / 50)) * 29) + 32});
  }

  render() {
    return (
      <div
        className={classNames(this.props.className, ' operation')}
        style={{'height': (this.state.descHeight + 'px')}}
      >
        <a href={this.props.operation.address} target="_blank">
          <div
            className="title"
            title={this.props.operation.title}
          >
            {this.props.operation.title}
          </div>
          <div className="description">{this.props.operation.description}</div>
        </a>
        <StyledOperationMenuContainer
          operation={this.props.operation}
          operationMenuStore={new OperationMenuStore()}
        />
      </div>
    );
  }
}

export const StyledOperation = inject('operationStore')(styled(Operation)`
  font-size: 24px;
  background: #FFFFFF;
  font-family: Amaranth;
  margin-top: 5px;
  border-radius: 2px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  
  .title {
    width: 250px;
    margin-left: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: underline;
  }

  .description {
    width: 675px;
    white-space: normal;
    color: #474747;
  }

  a {
    height: 100%;
    align-items: center;
    text-decoration: none;
    color: #000000;
    display: flex;
  }
`);