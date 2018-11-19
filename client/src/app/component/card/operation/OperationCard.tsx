import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { OperationStore } from './OperationStore';
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
                  title={obj.title}
                  description={obj.description}
                  address={obj.address}
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
width: 1078px;
height: 380px;
padding-left: 6px;


.operationCardTitle {
  background-color: #364958;
  border-radius: 10px 10px 0px 0px;
  height: 34px;
  line-height: 34px;
  color: #FFFFFF;
  font-size: 24px;
  margin-bottom: 5px;
  font-family: Amaranth;
  text-align: center;
  box-shadow: -1px 3px 3px rgba(0,0,0,.25);
}

.operationList {
  max-height: 331px;
  overflow-y: auto;
  border-radius: 0px 0px 10px 10px;
  background-color: #EAEAEA;
  height: 330px;
  border: 6px solid #EAEAEA;
  box-shadow: -1px 3px 3px rgba(0,0,0,.25);
}

.operationList :first-child {
  margin-top: 0px;
}

.operationList :last-child {
  border-radius: 2px 2px 5px 5px;
}

.addOperationButton {
  background: none;
  border: none;
  display: inline-flex;
  position: absolute;
  right: 8px;
  top: 7px;
}
`);