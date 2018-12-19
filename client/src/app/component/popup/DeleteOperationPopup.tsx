import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledPopupModal } from './PopupModal';
import { OperationStore } from '../card/operation/stores/OperationStore';
import { OperationActions } from '../card/operation/actions/OperationActions';
import { MetricActions } from '../metrics/metric/MetricActions';
import { LogableActions } from '../metrics/metric/MetricModel';

interface Props {
  className?: string;
  operationActions?: OperationActions;
  operationStore?: OperationStore;
  metricActions?: MetricActions;
}

@observer
export class DeleteOperationPopup extends React.Component<Props> {
  onClick = async () => {
    const title = this.props.operationStore!.pendingDelete!.title;
    await this.props.operationActions!.deleteOperation(this.props.operationStore!.pendingDelete!.id!);
    this.props.metricActions!.logMetric(LogableActions.DELETE_OP, title);
  };

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledPopupModal
          className="deletePopup"
          title="Are you sure you want to delete this operation?"
          onCancel={() => {
            this.props.operationActions!.clearPendingDelete();
          }}
        >
          <output
            className="pendingDeleteTitle"
            title={this.props.operationStore!.pendingDelete!.title}
          >
            {this.props.operationStore!.pendingDelete!.title}
          </output>
          <button
            className="confirmButton"
            onClick={this.onClick}
          >
            DELETE
          </button>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledDeleteOperationPopup = inject('operationActions', 'operationStore', 'metricActions')
(styled(DeleteOperationPopup)`
  .modal {
  width: 514px;
  height: 190px;
  }
  
  .title {
  height: 61px;
  width: 514px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  }
  
  .pendingDeleteTitle {
    position: absolute;
    background: #C4C4C4;
    border: none;
    font-size: 24px;
    height: 40px;
    width: 490px;
    top: 61px;
    bottom: 89px;
    left: 12px;
    right: 56px;
    opacity: 0.5;
    color: black;
    text-align: left;
    padding-left: 7px;
    box-sizing: border-box;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .confirmButton {
    position: absolute;
    left: 15%;
    bottom: 20px;
    background: #844646;
    width: 157px;
    height: 49px;
    font-size: 24px;
    cursor: pointer;
    outline: 0px;
    border: solid #844646;
    color: #FFFFFF;
    border-radius: 3px;
  }
  
  .cancelButton {
    position: absolute;
    right: 15%;
    bottom: 20px;
    background: white;
    border: solid #844646;
    color: #844646;
    border-radius: 3px;
  }
`);