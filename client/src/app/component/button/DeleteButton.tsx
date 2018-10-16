import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { DeleteIcon } from '../../icon/DeleteIcon';
import { ResourceActions } from '../../resource/actions/ResourceActions';
import { StyledButton } from './Button';
import { ResourceModel } from '../../resource/ResourceModel';
import classNames = require('classnames');

interface Props {
  resource: ResourceModel;
  resourceActions?: ResourceActions;
  className?: string;
}

@observer
export class DeleteButton extends React.Component<Props> {
  onClick = async () => {
    await this.props.resourceActions!.createPendingDelete(this.props.resource);
  };

  render() {
    return (
      <div className={this.props.className}>
        <StyledButton
          className={classNames('deleteButton', this.props.resource.name)}
          onClick={this.onClick}
        >
          <DeleteIcon/>
        </StyledButton>
      </div>

    );
  }
}

export const StyledDeleteButton = inject('resourceActions')(styled(DeleteButton)`
     
  .deleteButton {
    height: 37px;
    padding: 7px;
    border: none;
    background: none;
    cursor: pointer;
  }
`);