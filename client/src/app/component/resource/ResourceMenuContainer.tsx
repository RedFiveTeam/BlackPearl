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

interface Props {
  resource: ResourceModel;
  resourceMenuStore: ResourceMenuStore;
  resourceActions?: ResourceActions;
  profileStore?: ProfileStore;
  className?: string;
}

@observer
export class ResourceMenuContainer extends React.Component<Props> {
  node: any = this.node;

  componentDidMount() {
    this.props.resourceMenuStore.hydrate();
    document.addEventListener('click', this.handleClick, false);
  }

  handleClick = (e: any) => {
    if (this.node && this.node.contains(e.target)) {
      return;
    }
    this.props.resourceMenuStore.menuVisibilityOff();
  };

  edit = async () => {
    await this.props.resourceActions!.createPendingEdit(this.props.resource);
    this.props.resourceMenuStore.menuVisibilityOff();
  };

  delete = async () => {
    await this.props.resourceActions!.createPendingDelete(this.props.resource);
    this.props.resourceMenuStore.menuVisibilityOff();
  };

  favorite = async () => {
    let res = new ResourceModel(null, this.props.resource.url, this.props.resource.name);
    res.setAccountId(this.props.profileStore!.profile.cardID);
    res.setCategoryId(0);
    await this.props.resourceActions!.saveFavorite(res);
  };

  threeDot = () => {
    this.props.resourceMenuStore.toggleMenuVisibility();
    /*
    tried to get the a tag to dynamically change size
    let a = document.querySelector('.resource > div > a') as HTMLElement;
    this.props.resourceMenuStore.menuVisible ? this.target.style.width = '183px' : this.target.style.width = '295px';
    */
  };

  render() {
    const {resourceMenuStore} = this.props;
    return (
      <div
        ref={node => this.node = node}
        className={this.props.className}
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

export const StyledResourceMenuContainer = inject('resourceActions', 'profileStore')(styled(ResourceMenuContainer)`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
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