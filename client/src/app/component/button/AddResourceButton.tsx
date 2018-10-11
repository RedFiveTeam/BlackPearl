import * as React from 'react';
import styled from 'styled-components';
import { ResourceActions } from '../../resource/actions/ResourceActions';
import { inject } from 'mobx-react';
import { StyledButton } from './Button';
import { AddResourceIcon } from '../../icon/AddResourceIcon';

interface Props {
  resourceActions?: ResourceActions;
  className?: string;
}

export class AddResourceButton extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledButton
          className="addResourceButton"
          onClick={() => {
            this.props.resourceActions!.createPendingResource();
          }}
        >
          <div className="icon">
            <AddResourceIcon/>
          </div>
          <div className="addResourceTitle">
          ADD RESOURCE
          </div>
        </StyledButton>
      </div>
    );
  }
}

export const StyledAddResourceButton = inject('resourceActions')(styled(AddResourceButton)`
  .addResourceButton {
  width: 335px;
  height: 38px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid grey;
  border-top: 1px solid grey;
  color: #7A7A7A;
  background: #EAEAEA;
  }
  
  .addResourceTitle {
  margin-left: 15px;
  margin-top: -21px;
  text-decoration: underline;
  text-decoration-color: grey;
  }
  
  .icon {
  margin-right: 110px;
  }
  
  .addResourceButton:hover {
  cursor: pointer;
  }
`);