import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from '../resource/stores/ResourceStore';
import styled from 'styled-components';
import { StyledAddResourcePopup } from '../component/popup/AddResourcePopup';
import { StyledCard } from '../component/card/Card';

interface Props {
  resourceStore?: ResourceStore;
}

@observer
export class HomePage extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        {
          this.props.resourceStore!.hasPendingResource &&
            <StyledAddResourcePopup/>
        }
        <div>
          <StyledCard
            title="MAIN"
          />
        </div>
      </React.Fragment>
    );
  }
}

export const StyledHomePage = inject('resourceStore')(styled(HomePage)``);
