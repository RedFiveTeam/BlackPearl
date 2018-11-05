import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from '../component/resource/stores/ResourceStore';
import styled from 'styled-components';
import { StyledAddResourcePopup } from '../component/popup/AddResourcePopup';
import { StyledCardContainer } from '../component/card/CardContainer';
import { StyledRemoveResourcePopup } from '../component/popup/RemoveResourcePopup';
import { StyledEditResourcePopup } from '../component/popup/EditResourcePopup';
import { StyledAcronymContainer } from '../component/widgets/acronym/AcronymContainer';
import { StyledWeatherContainer } from '../component/widgets/weather/WeatherContainer';
import {
  StyledCoordinateConverterContainer
} from '../component/widgets/coordinateConverter/CoordinateConverterContainer';
import { StyledLoadingOverlay } from '../component/loading/LoadingOverlay';

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
          this.props.resourceStore!.loading &&
            <StyledLoadingOverlay/>
        }
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
          <div className="widgetSection">
            <StyledAcronymContainer/>
            <StyledCoordinateConverterContainer/>
            <StyledWeatherContainer/>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledHomePage = inject('resourceStore')(styled(HomePage)`
  .cardsContainer {
    display: flex;
  }
  
  .widgetSection {
    display: block;
  }
`);
