import * as React from 'react';
import styled from 'styled-components';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { inject } from 'mobx-react';
import { StyledButton } from './Button';
import { AddResourceIcon } from '../../icon/AddResourceIcon';
import { Category } from '../resource/ResourceModel';

interface Props {
  resourceActions?: ResourceActions;
  className?: string;
  category: Category;
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
            this.props.resourceActions!.setPendingResourceCategory(this.props.category);
            this.props.resourceActions!.setPendingResourceAccountID();
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
  width: calc(100% - 30px);
  margin: auto;

  .addResourceButton {
    width: 100%;
    height: 76px;
    line-height: 76px;
    font-size: 14px;
    border: none;
    border-top: 1px solid #8190A5;
    background: #292E33;
    display: flex;
    justify-content: center;
  }
  
  .icon {
    padding-top: 8px;
  }
  
  .addResourceTitle {
    margin-top: 2px;
    margin-left: 8px;
    color: #76ADED;
  }
  
  .addResourceButton:hover {
    cursor: pointer;
  }
`);