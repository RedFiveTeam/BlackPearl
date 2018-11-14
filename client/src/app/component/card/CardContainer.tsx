import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledCard } from './Card';
import { Category } from '../resource/ResourceModel';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { StyledInformationContainer } from './information/InformationContainer';
import classNames = require('classnames');
import { ProfileActions } from '../../profile/ProfileActions';

interface Props {
  className?: string;
  resourceActions?: ResourceActions;
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
        <StyledCard category={Category.Main}/>
        <StyledCard category={Category.SituationalAwareness}/>
        <StyledCard category={Category.TargetResearch}/>
        <StyledInformationContainer/>
      </div>
    );
  }
}

export const StyledCardContainer = inject('resourceActions', 'profileActions')(styled(CardContainer)`
  display: flex;
  height: 955px;
  max-height: 955px;
  position: relative;
`);