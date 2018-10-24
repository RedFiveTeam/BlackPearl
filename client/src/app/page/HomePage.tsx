import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from '../resource/stores/ResourceStore';
import styled from 'styled-components';
import { StyledAddResourcePopup } from '../component/popup/AddResourcePopup';
import { StyledCardContainer } from '../component/card/CardContainer';
import { StyledRemoveResourcePopup } from '../component/popup/RemoveResourcePopup';
import { StyledEditResourcePopup } from '../component/popup/EditResourcePopup';
import { StyledAcronymContainer } from '../component/widgets/acronym/AcronymContainer';

interface Props {
  resourceStore?: ResourceStore;
  className?: string;
}

@observer
export class HomePage extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.resourceStore!.hasPendingResource &&
            <StyledAddResourcePopup/>
        }
        {
          this.props.resourceStore!.hasPendingEdit &&
            <StyledEditResourcePopup/>
        }
        {
          this.props.resourceStore!.hasPendingDelete &&
          <StyledRemoveResourcePopup/>
        }
        <div
          className="cardsContainer"
        >
          <StyledCardContainer/>
          <StyledAcronymContainer/>
        </div>
      </div>
    );
  }
}

export const StyledHomePage = inject('resourceStore')(styled(HomePage)`
  .cardsContainer {
    display: flex;
  }
`);
