import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from './stores/ResourceStore';
import styled from 'styled-components';
import { ResourceModel } from './ResourceModel';
import { StyledResourceMenuContainer } from './ResourceMenuContainer';
import { action, observable } from 'mobx';
import { InputValidation } from '../../utils/inputValidation/InputValidation';
import { toast } from 'react-toastify';
import { EarthIcon } from '../../icon/EarthIcon';
import { FolderIcon } from '../../icon/FolderIcon';
import { ResourceActions } from './actions/ResourceActions';
import * as ReactDOM from 'react-dom';
import { MetricActions } from '../metrics/metric/MetricActions';
import { LogableActions } from '../metrics/metric/MetricModel';
import classNames = require('classnames');

interface Props {
  resource: ResourceModel;
  resourceStore?: ResourceStore;
  resourceActions?: ResourceActions;
  metricActions?: MetricActions;
  className?: string;
}

@observer
export class Resource extends React.Component<Props> {
  valid = new InputValidation();
  @observable state = {isLocal: false};

  @action.bound
  async launchResource(e: any) {
    if (this.state.isLocal) {
      e.preventDefault();
      let selected = null;
      let el = document.createElement('textarea');
      if (el) {
        el.value = this.props.resource.url;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.getElementsByClassName('topBar')[0].appendChild(el);
        if (document.getSelection()!.rangeCount > 0) {
          selected = document.getSelection()!.getRangeAt(0);
        }
        el.select();
        document.execCommand('copy');
        document.getElementsByClassName('topBar')[0].removeChild(el);
        if (selected) {
          document.getSelection()!.removeAllRanges();
          document.getSelection()!.addRange(selected);
        }
        toast.success('Local Path Copied to Clipboard');
      }
    }
    await this.props.metricActions!.logMetric(LogableActions.CLICK_RESOURCE, this.props.resource!.name);
    await this.props.resourceActions!.updateClicks(this.props.resource!.id!);
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
      <div
        className={classNames(this.props.className, 'resource')}
        onMouseEnter={() => {
          let ele = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('.resourceMenu') as HTMLElement;
          if (ele) {
            ele.style.opacity = '1';
          }
        }}
        onMouseLeave={() => {
          let ele = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('.resourceMenu') as HTMLElement;
          if (ele) {
            ele.style.opacity = '0';
          }
        }}
      >
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
        />
      </div>
    );
  }
}

export const StyledResource = inject('resourceStore', 'resourceActions', 'metricActions')
(styled(Resource)`
  width: calc(100% - 30px);
  height: 37px;
  border: none;
  border-top: 1px solid #8190A5;
  font-size: 20px;
  margin: auto;
  display: flex;
  vertical-align: middle;
  line-height: 27px;
  overflow: hidden;
  position: relative;
  transition: background 0.5s ease;
  
  :hover {
    background: #1F2226;
  }
  
  .resourceLink {
    width: 80%;
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
    max-width: 16vw;
    padding-left: 7px;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: -1px;
    white-space: nowrap;
    color: #E4E7EA;
  }
  
  #borderIcon {
    position: relative;
    bottom: 1px;
  }
  
  #earthIcon {
    padding-top: 2px;
  }
`);
