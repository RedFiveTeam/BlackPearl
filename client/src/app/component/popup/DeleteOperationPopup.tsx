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
    await this.props.metricActions!.logMetric(LogableActions.DELETE_OP, title);
  };

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledPopupModal
          className="deletePopup"
          title="Delete Operation"
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
    height: 250px;
  }
  
  .pendingDeleteTitle {
    position: absolute;
    background: #C4C4C4;
    border: none;
    font-size: 24px;
    height: 40px;
    width: 440px;
    top: 114px;
    bottom: 89px;
    left: 27px;
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
     cursor: pointer;
     border-radius: 2px;
     right: 11%;
     bottom: 6%;
     color: #FFFFFF;
     background-image: linear-gradient(to bottom, #a90329 17%,#8f0222 42%,#6d0019 81%);
     border: none;
     width: 94px;
     height: 36px;
  }
  
  .cancelButton {
    position: absolute;
    right: 34%;
    bottom: 10%;
    color: #fff;
  }
  
  button:focus {
   outline: 0;
  }
`);