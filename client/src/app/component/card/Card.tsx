import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledResourceList } from '../../resource/ResourceList';
import { StyledAddResourceButton } from '../button/AddResourceButton';

interface Props {
  className?: string;
  title: string;
}

@observer
export class Card extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className="cardTitle"
        >
          {this.props.title}
        </div>
        <div
          className="body"
        >
          <StyledResourceList/>
          <StyledAddResourceButton/>
        </div>
      </div>
    );
  }
}

export const StyledCard = styled(Card)`
   width: 353px;
   
   .cardTitle {
    width: 100%;
    height: 32px;
    background: #15191C;
    font-family: Acme;
    font-size: 24px;
    text-align: center;
    line-height: 32px;
    vertical-align: middle;
    color: #FFFFFF;
    box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
    margin-bottom: 5px;
   }
   
  .body {
    background: #EAEAEA;
    height: 889px;
    width: 100%;
    padding-top: 10px;
    box-shadow: -1px 3px 3px rgba(0, 0, 0, .25);
  }
`;