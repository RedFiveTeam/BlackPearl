import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledAddResourceButton } from '../button/AddResourceButton';
import { Category, CategoryName, ResourceModel } from '../resource/ResourceModel';
import { StyledResourceContainer } from '../resource/ResourceContainer';
import { MainIcon } from '../../icon/MainIcon';
import { SituationalAwarenessIcon } from '../../icon/SituationalAwarenessIcon';
import { TargetResearchIcon } from '../../icon/TargetResearchIcon';
import { FavoriteCategoryIcon } from '../../icon/FavoriteCategoryIcon';

interface Props {
  category: Category;
  resources: ResourceModel[];
  className?: string;
}

@observer
export class Card extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.className + ' category' + this.props.category}>
        <div className="cardHeader">
          {
            (this.props.category === 1 || this.props.category === 4 || this.props.category === 7) &&
            <MainIcon/>
          }
          {
            (this.props.category === 2 || this.props.category === 5 || this.props.category === 8) &&
            <SituationalAwarenessIcon/>
          }
          {
            (this.props.category === 3 || this.props.category === 6 || this.props.category === 9) &&
            <TargetResearchIcon/>
          }
          {
            this.props.category === 0 &&
            <FavoriteCategoryIcon/>
          }
          <span
            className="cardTitle"
          >
            {CategoryName[Category[this.props.category]]}
          </span>
        </div>
        <div className="body">
          <StyledResourceContainer
            category={this.props.category}
            resources={this.props.resources}
          />
          <StyledAddResourceButton
            category={this.props.category}
          />
        </div>
      </div>
    );
  }
}

export const StyledCard = styled(Card)`
   width: 25%;
   padding-left: 8px;
   height: 100%;
   max-height: 702px;
   
   .cardHeader {
    margin-top: 6px;
    width: 100%;
    height: 32px;
    background: #1F2226;
    font-size: 24px;
    text-align: center;
    line-height: 32px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
   }
   
  .body {
    margin-top: 5px;
    border-radius: 4px;
    background: #292E33;
    height: 100%;
    width: 100%;
    padding-top: 15px;
    box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
  }
  
  #mainIcon {
    margin-right: 16px;
    margin-bottom: 4px;
  }
  
  #situationalAwarenessIcon {
    margin-right: 16px;
  }
  
  #targetResearchIcon {
    margin-right: 16px;
  }
  
  #favoriteCategoryIcon {
    margin-right: 16px;
  }
`;