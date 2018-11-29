import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledCard } from './Card';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { StyledInformationContainer } from './information/InformationContainer';
import { StyledOperationContainer } from './operation/OperationContainer';
import { ProfileActions } from '../../profile/ProfileActions';
import { ResourceStore } from '../resource/stores/ResourceStore';
import classNames = require('classnames');
import { StyledTabContainer } from './TabContainer';

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
          <StyledInformationContainer/>
          <StyledOperationContainer/>
        </div>
      </div>
    );
  }
}

export const StyledCardContainer = inject('resourceActions', 'profileActions', 'resourceStore')(styled(CardContainer)`
  margin-top: 5px;
  
  .cardBody {
    display: flex;
    padding-top: 6px;
    padding-right: 8px;
    height: 1175px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: 0px 0px 10px 4px rgba(0,0,0,0.25);
    border-radius: 0 4px 4px 0;
  }
`);