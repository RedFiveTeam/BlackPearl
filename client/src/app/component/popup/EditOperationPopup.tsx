import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { OperationActions } from '../card/operation/actions/OperationActions';
import { OperationStore } from '../card/operation/stores/OperationStore';
import { StyledPopupModal } from './PopupModal';
import { MetricActions } from '../metrics/metric/MetricActions';
import { LogableActions } from '../metrics/metric/MetricModel';
import * as ReactDOM from 'react-dom';

interface Props {
  className?: string;
  operationActions?: OperationActions;
  operationStore?: OperationStore;
  metricActions?: MetricActions;
}

interface State {
  title: string;
  address: string;
  description: string;
}

@observer
export class EditOperationPopup extends React.Component<Props, State> {
  state = {
    title: this.props.operationStore!.pendingEdit!.title,
    address: this.props.operationStore!.pendingEdit!.address,
    description: this.props.operationStore!.pendingEdit!.description
  };

  componentDidMount() {
    const component = this;
    ((ReactDOM.findDOMNode(this) as HTMLElement).querySelector('.pendingEditTitle') as HTMLElement).focus();
    (ReactDOM.findDOMNode(this) as HTMLElement).addEventListener('keypress', async (e) => {
      const key = e.which || e.keyCode;
      if (key === 13) {
        await component.onSaveButtonClick();
      }
    });
  }

  onTitleFieldChange = (e: any) => {
    this.setState({title: e.target.value});
  };

  onAddressFieldChange = (e: any) => {
    this.setState({address: e.target.value});
  };

  onDescriptionFieldChange = (e: any) => {
    this.setState({description: e.target.value});
  };

  async onSaveButtonClick() {
    this.props.operationStore!.pendingEdit!.setTitle(this.state.title);
    this.props.operationStore!.pendingEdit!.setAddress(this.state.address);
    this.props.operationStore!.pendingEdit!.setDescription(this.state.description);
    await this.props.operationActions!.updateOperation();
    this.props.metricActions!.logMetric(LogableActions.EDIT_OP, this.state.title);
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledPopupModal
          className="editPopup"
          title="Edit Operation"
          onCancel={() => {
            this.props.operationActions!.clearPendingEdit();
          }}
        >
          <input
            className="pendingEditTitle"
            type="text"
            placeholder={this.props.operationStore!.pendingEdit!.title}
            value={this.state.title}
            onChange={(e) => this.onTitleFieldChange(e)}
          />
          <input
            className="pendingEditDescription"
            type="text"
            placeholder={this.props.operationStore!.pendingEdit!.description}
            value={this.state.description}
            onChange={(e) => this.onDescriptionFieldChange(e)}
          />
          <input
            className="pendingEditAddress"
            type="text"
            placeholder={this.props.operationStore!.pendingEdit!.address}
            value={this.state.address}
            onChange={(e) => this.onAddressFieldChange(e)}
          />
          <button
            className="saveButton"
            onClick={async () => {
              await this.onSaveButtonClick();
            }}
          >
            SAVE
          </button>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledEditOperationPopup = inject('operationActions', 'operationStore', 'metricActions')
(styled(EditOperationPopup)`

.modal {
  height: 321px;
  width: 514px;
  }
  
  .title {
  padding-top: 20px;
  padding-bottom: 10px;
  color: #454545;
  }

  input {
    background: #C4C4C4;
    border: none;
    width: 488px;
    height: 38px;
    font-size: 24px;
    outline: none;
    border-radius: 3px;
    margin-bottom: 20px;
    ::placeholder {
      padding-left: 8px;
      opacity: 0.5;
      color: black;
    }
  }
  
  .saveButton {
    position: absolute;
    left: 15%;
    bottom: 22px;
    background: #65768B;
    width: 157px;
    height: 49px;
    font-size: 24px;
    outline: 0px;
    border: solid #65768B;
    color: #FFFFFF;
    border-radius: 3px;
  }
  
  .cancelButton {
    position: absolute;
    right: 15%;
    bottom: 22px;
    background: #FFFFFF;
    border: solid #65768B;
    color: #65768B;
    border-radius: 3px;
  }
`);