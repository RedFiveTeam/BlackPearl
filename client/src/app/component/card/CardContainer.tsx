import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledCard } from './Card';
import { Category } from '../../resource/ResourceModel';
import { ResourceActions } from '../../resource/actions/ResourceActions';

interface Props {
  className?: string;
  resourceActions?: ResourceActions;
}

@observer
export class CardContainer extends React.Component<Props> {
  async componentDidMount() {
    await this.props.resourceActions!.setAllResources();
  }

  render() {
    return (
      <div className={this.props.className}>
        <StyledCard category={Category.Main}/>
        <StyledCard category={Category.SituationalAwareness}/>
        <StyledCard category={Category.TargetResearch}/>
      </div>
    );
  }
}

export const StyledCardContainer = inject('resourceActions')(styled(CardContainer)`
display: flex;
`);