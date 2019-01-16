import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledPopupModal } from './PopupModal';
import { AcronymStore } from '../widgets/acronym/AcronymStore';
import { AcronymActions } from '../widgets/acronym/actions/AcronymActions';
import * as ReactDOM from 'react-dom';
import { action } from 'mobx';

interface Props {
  className?: string;
  acronymStore?: AcronymStore;
  acronymActions?: AcronymActions;
}

interface State {
  acronym: string;
  definition: string;
}

@observer
export class AddAcronymPopup extends React.Component<Props, State> {
  state = {acronym: '', definition: ''};

  componentDidMount() {
    ((ReactDOM.findDOMNode(this) as HTMLElement).querySelector('.acronymField') as HTMLElement).focus();

    (ReactDOM.findDOMNode(this) as HTMLElement).addEventListener('keypress', async (e) => {
      const key = e.which || e.keyCode;
      if (key === 13) {
        await this.onSaveButtonClick();
      }
    });
  }

  @action.bound
  async onSaveButtonClick() {
    if (this.state.acronym !== '' && this.state.definition !== '') {
      await this.props.acronymActions!.addAcronym(this.state.acronym, this.state.definition);
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledPopupModal
          title="Add Acronym"
          onCancel={() => {
            this.props.acronymStore!.setPendingAcronym(null);
          }}
        >
          <div className="group">
            <input
              value={this.state.acronym}
              className="acronymField"
              type="text"
              maxLength={64}
              required={true}
              onChange={(e) => this.setState({acronym: e.target.value})}
            />
            <span className="highlight"/>
            <span className="bar"/>
            <label>Title</label>
          </div>
          <div className="group">
            <input
              value={this.state.definition}
              className="definitionField"
              type="text"
              maxLength={512}
              required={true}
              onChange={(e) => this.setState({definition: e.target.value})}
            />
            <span className="highlight"/>
            <span className="bar"/>
            <label>Definition</label>
          </div>
          <button
            className="saveAcronymButton"
            onClick={this.onSaveButtonClick}
          >
            SAVE
          </button>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledAddAcronymPopup = inject('acronymStore', 'acronymActions')(styled(AddAcronymPopup)`

  .saveButton {
    background: linear-gradient(180deg, #679CF6 0%, #4072EE 100%);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    font-size: 14px;
    position: absolute;
    bottom: 25px;
  }
  
  .cancelButton {
    position: absolute;
    bottom: 6%;
    outline: none;
  }
   
  .saveAcronymButton {
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
    outline: none;
    font-size: 14px;
  }
  
  .group {
    margin-top: 45px;
    position: relative;
    width: 410px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .group:nth-of-type(2) {
    margin-top: 50px;
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
`);