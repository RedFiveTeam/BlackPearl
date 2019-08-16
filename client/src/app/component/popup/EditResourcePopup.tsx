import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { StyledPopupModal } from './PopupModal';
import { ResourceStore } from '../resource/stores/ResourceStore';
import { InputValidation } from '../../utils/inputValidation/InputValidation';
import { CSSProperties } from 'react';
import { ProfileStore } from '../../profile/ProfileStore';
import { MetricActions } from '../metrics/metric/MetricActions';
import { LogableActions } from '../metrics/metric/MetricModel';
import * as ReactDOM from 'react-dom';

interface Props {
  className?: string;
  resourceActions?: ResourceActions;
  resourceStore?: ResourceStore;
  profileStore?: ProfileStore;
  metricActions?: MetricActions;
}

interface State  {
  title: string;
  url: string;
  urlError: string;
  titleError: string;
  urlCSS: CSSProperties;
  titleCSS: CSSProperties;
}

@observer
export class EditResourcePopup extends React.Component<Props, State> {
  state = {
    title: this.props.resourceStore!.pendingEdit!.name,
    url: this.props.resourceStore!.pendingEdit!.url,
    urlError: '',
    titleError: '',
    urlCSS: {},
    titleCSS: {}
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

  onUrlFieldChange = (e: any) => {
    this.setState({url: e.target.value});
  };

  async onSaveButtonClick() {
    let valid = new InputValidation();
    let survivedEverything: boolean = true;
    this.setState({urlError: '', titleError: '', urlCSS: {}, titleCSS: {}});

    if (this.state.title === '') {
      survivedEverything = false;
      this.setState({titleError: 'Please enter a title'});
      this.setState({titleCSS: {'border': 'solid 2px #A40000'}});
    }

    if (this.state.url === '') {
      survivedEverything = false;
      this.setState({urlError: 'Please enter an address'});
      this.setState({urlCSS: {'border': 'solid 2px #A40000'}});
    } else if (!valid.isValidResource(this.state.url)) {
      survivedEverything = false;
      this.setState({urlError: 'Please enter a valid address (https://www...)'});
      this.setState({urlCSS: {'border': 'solid 2px #A40000'}});
    }

    if (survivedEverything) {
      this.props.resourceStore!.pendingEdit!.setUrl(this.state.url);
      this.props.resourceStore!.pendingEdit!.setName(this.state.title);
      this.props.resourceStore!.pendingEdit!.setAccountId(this.props.profileStore!.profile.cardID);
      await this.props.resourceActions!.updateResource();
      await this.props.metricActions!.logMetric(LogableActions.EDIT_RESOURCE, this.state.title);
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <StyledPopupModal
          className="editPopup"
          title="Edit Resource"
          onCancel={() => {
            this.props.resourceActions!.clearPendingEdit();
          }}
        >
          <div className="group">
            <input
              className="pendingEditTitle"
              type="text"
              maxLength={64}
              style={this.state.titleCSS}
              placeholder={this.props.resourceStore!.pendingEdit!.name}
              value={this.state.title}
              onChange={(e) => this.onTitleFieldChange(e)}
            />
            <span className="highlight" />
            <span className="bar" />
            <label>Title</label>
          </div>
          {
            this.state.titleError !== '' &&
            <div className="titleError">{this.state.titleError}</div>
          }
          <div className="group">
            <input
              className="pendingEditUrl"
              type="text"
              style={this.state.urlCSS}
              placeholder={this.props.resourceStore!.pendingEdit!.url}
              value={this.state.url}
              onChange={(e) => this.onUrlFieldChange(e)}
            />
            <span className="highlight" />
            <span className="bar" />
            <label>Location</label>
          </div>
          {
            this.state.urlError !== '' &&
            <div className="urlError">{this.state.urlError}</div>
          }
          <button
            className="saveButton"
            onClick={async () => { await this.onSaveButtonClick(); }}
          >
            SAVE
          </button>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledEditResourcePopup = inject(
  'resourceActions',
  'resourceStore',
  'profileStore',
  'metricActions'
)(styled(EditResourcePopup)`

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
     }
     
     .titleError, .urlError {
     position: absolute;
     color: #FFF;
     }
     
     .titleError {
       left: 172px;
     }
     
     .urlError {
      left: 150px;
     }
`);
