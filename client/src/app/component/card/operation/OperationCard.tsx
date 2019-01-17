import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { OperationStore } from './stores/OperationStore';
import { StyledOperation } from './Operation';
import { StyledAddOperationButton } from '../../button/AddOperationButton';

interface Props {
  className?: string;
  operationStore?: OperationStore;
}

@observer
export class OperationCard extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className="operationCardTitle"
        >
          Current Operations
          <StyledAddOperationButton/>
        </div>
        <div
          className="operationList"
        >
          {
            this.props.operationStore!.operations.map((obj: any, index: number) => {
              return (
                <StyledOperation
                  key={index}
                  operation={obj}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export const StyledOperationCard = inject('operationStore')(styled(OperationCard)`
width: 100%;
height: auto;
display: block;
position: relative;

.operationCardTitle {
  background-color: #1F2226;
  border-radius: 10px 10px 0px 0px;
  height: 34px;
  line-height: 34px;
  color: #FFFFFF;
  font-size: 24px;
  margin-bottom: 5px;
  text-align: center;
  box-shadow: -1px 3px 3px rgba(0,0,0,.25);
}

.operationList {
  max-height: 900px;
  overflow-y: auto;
  border-radius: 0px 0px 10px 10px;
  background-color: #1F2226;
  height: 90%;
  border: 6px solid #1F2226;
  box-shadow: -1px 3px 3px rgba(0,0,0,.25);
}

.operationList :first-child {
  margin-top: 0px;
}

.addOperationButton {
  background: none;
  border: none; 
  display: inline-flex;
  height: 22px;
  width: 27px
  position: absolute;
  right: 7px;
  top: 6px;
  
}

.addOperationButton:hover {
  cursor: pointer;
}
`);