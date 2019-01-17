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
    await this.props.metricActions!.logMetric(LogableActions.ADD_OP, this.state.title);
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
          <div className="group">
            <input
              className="titleField"
              type="text"
              required={true}
              onChange={(e) => this.onTitleFieldChange(e)}
            />
            <span className="highlight" />
            <span className="bar" />
            <label>Title</label>
          </div>
          <div className="group">
            <input
              className="descriptionField"
              type="text"
              required={true}
              onChange={(e) => this.onDescriptionFieldChange(e)}
            />
            <span className="highlight" />
            <span className="bar" />
            <label>Description</label>
          </div>
          <div className="group">
            <input
              className="addressField"
              type="text"
              required={true}
              onChange={(e) => this.onAddressFieldChange(e)}
            />
            <span className="highlight" />
            <span className="bar" />
            <label>URL</label>
          </div>
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
  height: 450px;
  }
  .group {
    margin-top: 55px;
    position: relative;
    width: 410px;
    margin-left: auto;
    margin-right: auto;
  }
  
  input {
    padding-bottom: 5px;
    padding-left: 0;
    padding-right: 0;
    display: block;
    width: 400px;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    background: #292E33;
    color: #FFFFFF;
    font-size: 24px;
  }
  
  input:focus {
    outline: none;
  }
  
  label {
    color: #999;
    font-size: 14px;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 5px;
    opacity: 0.2;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  
  input:focus ~ label, input:valid ~label {
    top: -20px;
    font-size: 14px;
    color: #93A7C3;
    opacity: 1;
  }
  
  .bar {
    position: relative;
    display: block;
    width: 400px;
  }
  
  .bar:before, .bar:after {
    content: '';
    height: 2px;
    width: 0px;
    bottom: 0px;
    position: absolute;
    background: #93A7C3;
    transition:0.2s ease all; 
    -moz-transition:0.2s ease all; 
    -webkit-transition:0.2s ease all;
  }
  
  .bar:before {
    left: 50%;
  }
  
  .bar:after {
    right: 50%;
  }
  
  input:focus ~ .bar:before, input:focus ~ .bar:after {
    width:50%;
  }
  
  .highlight {
    position:absolute;
    height:60%; 
    width:100px; 
    top:25%; 
    left:0;
    pointer-events:none;
    opacity:0.5;
  }
  
  input:focus ~ .highlight {
    -webkit-animation:inputHighlighter 0.3s ease;
    -moz-animation:inputHighlighter 0.3s ease;
    animation:inputHighlighter 0.3s ease;
  }
  
  @-webkit-keyframes inputHighlighter {
	from { background:#5264AE; }
    to 	{ width:0; background:transparent; }
  }
  @-moz-keyframes inputHighlighter {
      from { background:#5264AE; }
    to 	{ width:0; background:transparent; }
  }
  @keyframes inputHighlighter {
      from { background:#5264AE; }
    to 	{ width:0; background:transparent; }
  }
  
    .cancelButton {
    position: absolute;
    right: 34%;
    bottom: 8%;
   }
   
   button:focus {
   outline: 0;
   }
   
   .saveButton {
     position: absolute;
     cursor: pointer;
     border-radius: 2px;
     right: 11%;
     bottom: 6%;
     color: #FFFFFF;
     background-image: linear-gradient(to bottom, #207cca 11%,#207cca 11%,#207cca 27%,#207cca 44%,#1e5799 100%);
     border: none;
     width: 94px;
     height: 36px;
     font-size: 14px;
     }
     
     .titleError, .urlError {
     color: #FFF;
     }
`);