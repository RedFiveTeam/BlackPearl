import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledButton } from './Button';

const addFavorite = require('../../icon/addFavoriteEmpty.png');

interface Props {
  onClick: () => void;
  className?: string;
}

@observer
export class FavoriteButton extends React.Component<Props> {

  render() {
    return (
      <div className={this.props.className}>
        <StyledButton
          onClick={this.props.onClick}
          className={'favoriteButton'}
        >
          <img src={addFavorite}/>
        </StyledButton>
      </div>
    );
  }
}

export const StyledFavoriteButton = inject('resourceActions')(styled(FavoriteButton)`
  
  margin-top: 3px;
  
  .favoriteButton {
    height: 37px;
    border: none;
    background: none;
    cursor: pointer;
   }
    
    img {
      height: 17px;
      width: 17px;
    }
`);