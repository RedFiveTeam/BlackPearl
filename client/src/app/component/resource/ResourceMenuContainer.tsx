import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledThreeDotButton } from '../button/ThreeDotButton';
import { StyledDeleteButton } from '../button/DeleteButton';
import { StyledEditButton } from '../button/EditButton';
import { BorderIcon } from '../../icon/BorderIcon';
import { ResourceModel } from './ResourceModel';
import { ResourceActions } from './actions/ResourceActions';
import { ResourceMenuStore } from './stores/ResourceMenuStore';
import { StyledFavoriteButton } from '../button/FavoriteButton';
import { ProfileStore } from '../../profile/ProfileStore';
import { MetricActions } from '../metrics/metric/MetricActions';
import { LogableActions } from '../metrics/metric/MetricModel';

interface Props {
  resource: ResourceModel;
  resourceMenuStore: ResourceMenuStore;
  resourceActions?: ResourceActions;
  profileStore?: ProfileStore;
  metricActions?: MetricActions;
  className?: string;
}

@observer
export class ResourceMenuContainer extends React.Component<Props> {
  node: any = this.node;

  state = {backgroundColor: 'rgba(0, 0, 0, 0)', zIndex: 0};

  componentDidMount() {
    this.props.resourceMenuStore.hydrate();
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick = (e: any) => {
    if (this.node && this.node.contains(e.target)) {
      return;
    }
    this.props.resourceMenuStore.menuVisibilityOff();
    this.updateStyle();
  };

  edit = async () => {
    await this.props.resourceActions!.createPendingEdit(this.props.resource);
    this.props.resourceMenuStore.menuVisibilityOff();
    this.updateStyle();
  };

  delete = async () => {
    await this.props.resourceActions!.createPendingDelete(this.props.resource);
    this.props.resourceMenuStore.menuVisibilityOff();
    this.updateStyle();
  };

  favorite = async () => {
    let res = new ResourceModel(null, this.props.resource.url, this.props.resource.name);
    res.setAccountId(this.props.profileStore!.profile.cardID);
    res.setCategoryId(0);
    await this.props.resourceActions!.saveFavorite(res);
    this.updateStyle();
    this.props.metricActions!.logMetric(LogableActions.ADD_FAVORITE, this.props.resource.name);
  };

  updateStyle = () => {
    // let ele = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#threeDot');
    // let paths = (ele!.querySelectorAll('path') as NodeListOf<SVGPathElement>);
    if (this.props.resourceMenuStore.menuVisible) {
      // for (let i = 0; i < paths.length; i++) {
      //   paths[i].setAttribute('fill', '#5689F3');
      // }
      this.setState({
        backgroundColor:
          'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(19,31,39, .95) 5%, rgba(19,31,39, .95) 100%)',
        zIndex: 2
      });
    } else {
      // for (let i = 0; i < paths.length; i++) {
      //   paths[i].setAttribute('fill', '#FFF');
      // }
      this.setState({backgroundColor: 'rgba(0, 0, 0, 0)', zIndex: 0});
    }
  };

  threeDot = () => {
    this.props.resourceMenuStore.toggleMenuVisibility();
    this.updateStyle();
  };

  render() {
    const {resourceMenuStore} = this.props;
    return (
      <div
        ref={node => this.node = node}
        className={this.props.className + ' resourceMenu'}
        style={{background: this.state.backgroundColor, zIndex: this.state.zIndex}}
      >
        {
          (resourceMenuStore.menuVisible && this.props.resource.categoryID !== 0) &&
          <StyledFavoriteButton onClick={this.favorite}/>
        }
        {
          resourceMenuStore.menuVisible && this.props.resource.categoryID! > 0 &&
          <BorderIcon/>
        }
        {
          resourceMenuStore.menuVisible &&
          <StyledEditButton onClick={this.edit}/>
        }
        {
          resourceMenuStore.menuVisible &&
          <BorderIcon/>
        }
        {
          resourceMenuStore.menuVisible &&
          <StyledDeleteButton onClick={this.delete}/>
        }
        <StyledThreeDotButton
          onClick={this.threeDot}
          className={this.props.resource.name}
        />
      </div>
    );
  }
}

export const StyledResourceMenuContainer = inject('resourceActions', 'profileStore', 'metricActions')
(styled(ResourceMenuContainer)`
  position: absolute;
  height: 37px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  right: 0px;
  
  svg {
    padding-left: 7px;
    filter: drop-shadow(-1px 1px 1px rgba(0,0,0,0.25));
  }
  
  .deleteButton {
      padding-top: 15%;
      padding-right: 0px;
  }
  
  .editButton {
      padding-top: 15%;
  }
`);