import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledCard } from './Card';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { ProfileActions } from '../../profile/ProfileActions';
import { ResourceStore } from '../resource/stores/ResourceStore';
import classNames = require('classnames');
import { StyledTabContainer } from './TabContainer';
import { Category } from '../resource/ResourceModel';

interface Props {
  className?: string;
  resourceActions?: ResourceActions;
  resourceStore?: ResourceStore;
  profileActions?: ProfileActions;
}

@observer
export class CardContainer extends React.Component<Props> {
  async componentDidMount() {
    await this.props.profileActions!.setProfile();
    await this.props.resourceActions!.setAllResources();
  }

  render() {
    return (
      <div className={classNames('cardContainer', this.props.className)}>
        <StyledTabContainer profileActions={this.props.profileActions}/>
        <div
          className="cardBody"
        >
          <StyledCard
            category={this.props.resourceStore!.activeTab * 3 - 2}
            resources={this.props.resourceStore!.returnResourcesInCategory(this.props.resourceStore!.activeTab * 3 - 2)}
          />
          <StyledCard
            category={this.props.resourceStore!.activeTab * 3 - 1}
            resources={this.props.resourceStore!.returnResourcesInCategory(this.props.resourceStore!.activeTab * 3 - 1)}
          />
          <StyledCard
            category={this.props.resourceStore!.activeTab * 3}
            resources={this.props.resourceStore!.returnResourcesInCategory(this.props.resourceStore!.activeTab * 3)}
          />
          <StyledCard
            className="myFavorites"
            category={Category.Favorites}
            resources={this.props.resourceStore!.returnResourcesInCategory(Category.Favorites)}
          />
        </div>
      </div>
    );
  }
}

export const StyledCardContainer = inject('resourceActions', 'profileActions', 'resourceStore')(styled(CardContainer)`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 100%;
  
  .cardBody {
    background: #1F2226;
    display: flex;
    padding-top: 6px;
    padding-right: 8px;
    height: 770px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
    border-radius: 0 4px 4px 0;
    width: 100%;
  }
  
  .tabContainer {
    width: 100%;
    display: flex;
    align-items: flex-end;
  }
`);