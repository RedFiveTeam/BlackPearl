import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledCard } from './Card';
import { Category } from '../resource/ResourceModel';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { StyledInformationContainer } from './information/InformationContainer';
import classNames = require('classnames');
import { StyledOperationContainer } from './operation/OperationContainer';
import { ProfileActions } from '../../profile/ProfileActions';
import { ResourceStore } from '../resource/stores/ResourceStore';

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
        <StyledCard
          category={Category.Main}
          resources={this.props.resourceStore!.returnResourcesInCategory(Category.Main)}
        />
        <StyledCard
          category={Category.SituationalAwareness}
          resources={this.props.resourceStore!.returnResourcesInCategory(Category.SituationalAwareness)}
        />
        <StyledCard
          category={Category.TargetResearch}
          resources={this.props.resourceStore!.returnResourcesInCategory(Category.TargetResearch)}
        />
        <StyledInformationContainer/>
        <StyledOperationContainer/>
      </div>
    );
  }
}

export const StyledCardContainer = inject('resourceActions', 'profileActions', 'resourceStore')(styled(CardContainer)`
  display: flex;
  max-height: 955px;
  position: relative;
`);