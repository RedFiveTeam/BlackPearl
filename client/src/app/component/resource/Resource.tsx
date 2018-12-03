import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from './stores/ResourceStore';
import styled from 'styled-components';
import { ResourceModel } from './ResourceModel';
import { StyledResourceMenuContainer } from './ResourceMenuContainer';
import { ResourceMenuStore } from './stores/ResourceMenuStore';
import { action, observable } from 'mobx';
import { InputValidation } from '../../utils/inputValidation/InputValidation';
import { toast } from 'react-toastify';
import { EarthIcon } from '../../icon/EarthIcon';
import { FolderIcon } from '../../icon/FolderIcon';
import classNames = require('classnames');
import { ResourceActions } from './actions/ResourceActions';
import * as ReactDOM from 'react-dom';

interface Props {
  resource: ResourceModel;
  resourceStore?: ResourceStore;
  resourceActions?: ResourceActions;
  className?: string;
}

@observer
export class Resource extends React.Component<Props> {
  valid = new InputValidation();
  @observable state = {isLocal: false};

  @action.bound
  launchResource(e: any) {
    this.props.resourceActions!.updateClicks(this.props.resource!.id!);
    if (this.state.isLocal) {
      e.preventDefault();
      let selected = null;
      let el = document.createElement('textarea');
      el.value = this.props.resource.url;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      if (document.getSelection().rangeCount > 0) {
        selected = document.getSelection().getRangeAt(0);
      }
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
      toast.success('Local Path Copied to Clipboard');
    }
  }

  componentDidMount() {
    let ele = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('a');
    ele!.addEventListener('click', this.launchResource);
    ele!.addEventListener('auxclick', this.launchResource);
    this.setState({isLocal: !this.valid.isInternetResource(this.props.resource.url)});
  }

  componentWillReceiveProps(newProps: Props) {
    this.setState({isLocal: !this.valid.isInternetResource(newProps.resource.url)});
  }

  componentWillUnmount() {
    let ele = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('a');
    ele!.removeEventListener('click', this.launchResource);
    ele!.removeEventListener('auxclick', this.launchResource);
  }

  render() {
    return (
      <div className={classNames(this.props.className, 'resource')}>
        <a
          className="resourceLink"
          href={this.props.resource.url}
          target="_blank"
          title={this.props.resource.name}
        >
          <span className="icon">
            {
              this.valid.isInternetResource(this.props.resource.url) ? <EarthIcon/> : <FolderIcon/>
            }
          </span>
          <span className="title">{this.props.resource.name}</span>
        </a>
        <StyledResourceMenuContainer
          resource={this.props.resource}
          resourceMenuStore={new ResourceMenuStore()}
        />
      </div>
    );
  }
}

export const StyledResource = inject('resourceStore', 'resourceActions')(styled(Resource)`
  width: 335px;
  height: 37px;
  border: none;
  border-top: 1px solid grey;
  background: #EAEAEA;
  font-family: Amaranth;
  font-size: 18px;
  margin: auto;
  display: flex;
  vertical-align: middle;
  line-height: 27px;
  overflow: hidden;
  position: relative;
  
  .resourceLink {
    width: 90%;
    text-decoration: none;
    color: black;
    display: inline-flex;
    position: relative;
    padding: 7px;
    margin: -1px;
    z-index: 1;
    cursor: pointer;
  }
  
  .title {
    padding-left: 7px;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: -1px;
    white-space: nowrap;
  }
  
  #borderIcon {
    position: relative;
    bottom: 1px;
  }
  
  #earthIcon {
    padding-top: 2px;
  }
`);
