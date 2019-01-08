import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { StyledPopupModal } from './PopupModal';
import { ResourceStore } from '../resource/stores/ResourceStore';
import { MetricActions } from '../metrics/metric/MetricActions';
import { LogableActions } from '../metrics/metric/MetricModel';

interface Props {
  className?: string;
  resourceActions?: ResourceActions;
  resourceStore?: ResourceStore;
  metricActions?: MetricActions;
}

@observer
export class RemoveResourcePopup extends React.Component<Props> {
  onClick = async () => {
    const name = this.props.resourceStore!.pendingDelete!.name;
    await this.props.resourceActions!.delete(this.props.resourceStore!.pendingDelete!.id!);
    await this.props.metricActions!.logMetric(LogableActions.DELETE_RESOURCE, name);
  };

  render() {
    return (
      <div className={this.props.className}>
        <StyledPopupModal
          className="deletePopup"
          title="Delete Resource"
          onCancel={() => {
            this.props.resourceActions!.clearPendingDelete();
          }}
        >
          <output
            className="pendingDeleteTitle"
            title={this.props.resourceStore!.pendingDelete!.name}
          >
            {this.props.resourceStore!.pendingDelete!.name}
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

export const StyledRemoveResourcePopup = inject('resourceActions', 'resourceStore', 'metricActions')
(styled(RemoveResourcePopup)`

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