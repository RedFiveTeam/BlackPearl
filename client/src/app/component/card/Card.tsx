import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledResourceList } from '../../resource/ResourceList';
import { StyledAddResourceButton } from '../button/AddResourceButton';
import { Category, CategoryName } from '../../resource/ResourceModel';

interface Props {
  className?: string;
  category: Category;
}

@observer
export class Card extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className  + ' category' + this.props.category}
      >
        <div
          className="cardTitle"
        >
          {CategoryName[Category[this.props.category]]}
        </div>
        <div
          className="body"
        >
          <StyledResourceList
            category={this.props.category}
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
   width: 353px;
   padding-left: 8px;
   
   .cardTitle {
    border-radius: 10px 10px 0px 0px;
    width: 100%;
    height: 32px;
    background: #15191C;
    font-family: Alegreya Sans;
    font-size: 24px;
    text-align: center;
    line-height: 32px;
    vertical-align: middle;
    color: #FFFFFF;
    box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
    margin-bottom: 5px;
   }
   
  .body {
    border-radius: 0px 0px 10px 10px;
    background: #EAEAEA;
    height: 889px;
    width: 100%;
    padding-top: 10px;
    box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
  }
`;