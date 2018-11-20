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
import { Category } from '../component/resource/ResourceModel';
import { StyledCard } from '../component/card/Card';
import { OperationStore } from '../component/card/operation/OperationStore';
import { StyledAddOperationPopup } from '../component/popup/AddOperationPopup';
import { StyledTimeContainer } from '../component/widgets/time/TimeContainer';

interface Props {
  resourceStore?: ResourceStore;
  operationStore?: OperationStore;
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
          this.props.operationStore!.hasPendingOperation &&
          <StyledAddOperationPopup/>
        }
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
            <StyledTimeContainer/>
            <StyledCard
              className="myFavorites"
              category={Category.Favorites}
              resources={this.props.resourceStore!.returnResourcesInCategory(Category.Favorites)}
            />
            <StyledAcronymContainer/>
            <StyledCoordinateConverterContainer/>
            <StyledWeatherContainer/>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledHomePage = inject('resourceStore', 'operationStore')(styled(HomePage)`
  .myFavorites {
    height: 190px;
    width: 338px;
    margin-left: 10px;
    background: #364958;
    margin-bottom: 10px;
    box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
    border-radius: 10px;

    .body {
        max-height: calc(190px - 32px - 10px);
        border-radius: 0px;
        height: 130px;
        width: 330px;
    }
    .resourceList {
        max-height: 92px;
        overflow-x: hidden;
    }
    
    .resource {
      width: 320px;
    }
    .cardTitle {
        box-shadow: none;
    }
    
    .addResourceButton {
      width: 320px;
      margin-left: 5px;
    }
  }

  .cardsContainer {
    display: flex;
  }
  
  .widgetSection {
    position: fixed;
    display: block;
    top: 1px;
    left: 1090px;
  }
`);
