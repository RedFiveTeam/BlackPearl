import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledOperationMenuContainer } from './OperationMenuContainer';
import { OperationModel } from './OperationModel';
import { OperationStore } from './stores/OperationStore';
import classNames = require('classnames');
import { LogableActions } from '../../metrics/metric/MetricModel';
import { MetricActions } from '../../metrics/metric/MetricActions';
import * as ReactDOM from 'react-dom';

interface Props {
  operation: OperationModel;
  operationStore?: OperationStore;
  metricActions?: MetricActions;
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
        onMouseEnter={() => {
          let ele = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('.operationMenu') as HTMLElement;
          if (ele) {
            ele.style.opacity = '1';
          }
        }}
        onMouseLeave={() => {
          let ele = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('.operationMenu') as HTMLElement;
          if (ele) {
            ele.style.opacity = '0';
          }
        }}
      >
        <a
          onClick={async () => {
            await this.props.metricActions!.logMetric(LogableActions.CLICK_OP, this.props.operation.title);
          }}
          href={this.props.operation.address}
          target="_blank"
        >
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
        />
      </div>
    );
  }
}

export const StyledOperation = inject('operationStore', 'metricActions')(styled(Operation)`
  font-size: 24px;
  background: #292E33;
  margin-top: 5px;
  border-radius: 2px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  transition: background 0.5s ease;
  
  :hover {
    background: #1F2226;
  }
  
  .title {
    width: 25%;
    margin-left: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    border-right: 1px solid #8290A5;
    padding-right: 20px;
  }

  .description {
    width: 75%;
    margin-left: 50px;
    white-space: normal;
    color: #FFFFFF;
  }

  a {
    height: 100%;
    width: 100%;
    align-items: center;
    text-decoration: none;
    color: #FEFEFE;
    display: flex;
  }
`);