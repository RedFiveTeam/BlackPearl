import * as React from 'react';
import { StyledPopupModal } from './PopupModal';
import styled from 'styled-components';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { inject } from 'mobx-react';
import { CSSProperties } from 'react';
import { InputValidation } from '../../utils/inputValidation/InputValidation';
import { MetricActions } from '../metrics/metric/MetricActions';
import { LogableActions } from '../metrics/metric/MetricModel';
import * as ReactDOM from 'react-dom';
import { ResourceStore } from '../resource/stores/ResourceStore';

interface Props {
  className?: string;
  resourceActions?: ResourceActions;
  resourceStore?: ResourceStore;
  metricActions?: MetricActions;
}

interface State {
  title: string;
  url: string;
  urlError: string;
  titleError: string;
  urlCSS: CSSProperties;
  titleCSS: CSSProperties;
}

export class AddResourcePopup extends React.Component<Props, State> {
  state = {title: '', url: '', urlError: '', titleError: '', urlCSS: {}, titleCSS: {}};

  componentDidMount() {
    const component = this;
    this.setState({
      title: this.props.resourceStore!.pendingResource ?
        this.props.resourceStore!.pendingResource!.name :
        ''
    });

    if (this.props.resourceStore!.pendingResource!.name !== '') {
      ((ReactDOM.findDOMNode(this) as HTMLElement).querySelector('.urlField') as HTMLElement).focus();
    } else {
      ((ReactDOM.findDOMNode(this) as HTMLElement).querySelector('.titleField') as HTMLElement).focus();
    }

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

  onUrlFieldChange = (e: any) => {
    this.setState({url: e.target.value});
  };

  async onSaveButtonClick() {
    let inputValidation = new InputValidation();
    let survivedEverything: boolean = true;
    this.setState({urlError: '', titleError: '', urlCSS: {}, titleCSS: {}});

    if (this.state.title === '') {
      survivedEverything = false;
      this.setState({titleError: 'Please enter a title'});
      this.setState({titleCSS: {'border': 'solid 2px #A40000'}});
    }

    if (this.props.resourceActions!.checkDuplicates(this.state.title)) {
      survivedEverything = false;
      this.setState({titleError: 'Resource already exists'});
      this.setState({titleCSS: {'border': 'solid 2px #A40000'}});
    }

    if (this.state.url === '') {
      survivedEverything = false;
      this.setState({urlError: 'Please enter an address'});
      this.setState({urlCSS: {'border': 'solid 2px #A40000'}});
    } else if (!inputValidation.isValidResource(this.state.url)) {
      survivedEverything = false;
      this.setState({urlError: 'Please enter a valid address (https://www...)'});
      this.setState({urlCSS: {'border': 'solid 2px #A40000'}});
    }

    if (survivedEverything) {
      this.props.resourceActions!.updatePendingResource(
        this.state.title,
        this.state.url
      );
      await this.props.resourceActions!.saveResource();
      await this.props.metricActions!.logMetric(LogableActions.ADD_RESOURCE, this.state.title);
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <StyledPopupModal
          title="Add Resource"
          onCancel={() => {
            this.props.resourceActions!.clearPendingResource();
          }}
        >
          <div className="group">
            <input
              value={this.state.title}
              className="titleField"
              type="text"
              style={this.state.titleCSS}
              maxLength={64}
              required={true}
              onChange={(e) => this.onTitleFieldChange(e)}
            />
            <span className="highlight" />
            <span className="bar" />
            <label>Title</label>
          </div>
          {
            this.state.titleError !== '' &&
            <span className="titleError">{this.state.titleError}</span>
          }
          <br/>
          <div className="group">
            <input
              value={this.state.url}
              className="urlField"
              type="text"
              style={this.state.urlCSS}
              required={true}
              onChange={(e) => this.onUrlFieldChange(e)}
            />
            <span className="highlight" />
            <span className="bar" />
            <label>Location</label>
          </div>
          {
            this.state.urlError !== '' &&
            <span className="urlError">{this.state.urlError}</span>
          }
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

export const StyledAddResourcePopup = inject('resourceActions', 'resourceStore', 'metricActions')
(styled(AddResourcePopup)`

  .group {
    margin-top: 55px;
    position: relative;
    width: 410px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .group:nth-of-type(2) {
    margin-top: 30px;
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
    font-size: 14px;
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