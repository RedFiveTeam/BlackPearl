import * as React from 'react';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import { StyledPopupModal } from './PopupModal';
import { OperationActions } from '../card/operation/actions/OperationActions';
import { MetricActions } from '../metrics/metric/MetricActions';
import { LogableActions } from '../metrics/metric/MetricModel';
import * as ReactDOM from 'react-dom';

interface Props {
  className?: string;
  operationActions?: OperationActions;
  metricActions?: MetricActions;
}

interface State {
  title: string;
  description: string;
  address: string;
}

export class AddOperationPopup extends React.Component<Props, State> {
  state = {title: '', description: '', address: ''};

  componentDidMount() {
    const component = this;
    ((ReactDOM.findDOMNode(this) as HTMLElement).querySelector('.titleField') as HTMLElement).focus();
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

  onDescriptionFieldChange = (e: any) => {
    this.setState({description: e.target.value});
  };

  onAddressFieldChange = (e: any) => {
    this.setState({address: e.target.value});
  };

  async onSaveButtonClick() {
    this.props.operationActions!.updatePendingOperation(
      this.state.title,
      this.state.description,
      this.state.address
    );
    await this.props.operationActions!.saveOperation();
    this.props.metricActions!.logMetric(LogableActions.ADD_OP, this.state.title);
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledPopupModal
          title="New Operation"
          onCancel={() => {
            this.props.operationActions!.clearPendingOperation();
          }}
        >
          <input
            className="titleField"
            placeholder="Title"
            type="text"
            onChange={(e) => this.onTitleFieldChange(e)}
          />
          <input
            className="descriptionField"
            placeholder="Description"
            type="text"
            onChange={(e) => this.onDescriptionFieldChange(e)}
          />
          <input
            className="addressField"
            placeholder="URL"
            type="text"
            onChange={(e) => this.onAddressFieldChange(e)}
          />
          <button
            onClick={async () => {
              await this.onSaveButtonClick();
            }}
            className="saveButton"
          >
            SAVE
          </button>
        </StyledPopupModal>

      </div>
    );
  }
}

export const StyledAddOperationPopup = inject('operationActions', 'metricActions')(styled(AddOperationPopup)`

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
    border-radius: 3px;
    position: absolute;
    right: 15%;
    bottom: 22px;
    background: #FFFFFF;
    border: solid #65768B;
    color: #65768B;
    border-radius: 3px;
  }

`);