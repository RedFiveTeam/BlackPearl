import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ResourceActions } from '../../resource/actions/ResourceActions';
import { StyledButton } from './Button';
import { ResourceModel } from '../../resource/ResourceModel';
import { EditIcon } from '../../icon/EditIcon';
import classNames = require('classnames');

interface Props {
  resource: ResourceModel;
  resourceActions?: ResourceActions;
  className?: string;
}

@observer
export class EditButton extends React.Component<Props> {
  onClick = async () => {
    await this.props.resourceActions!.createPendingEdit(this.props.resource);
  };

  render() {
    return (
      <div className={this.props.className}>
        <StyledButton
          className={classNames('editButton', this.props.resource.name)}
          onClick={this.onClick}
        >
          <EditIcon/>
        </StyledButton>
      </div>

    );
  }
}

export const StyledEditButton = inject('resourceActions')(styled(EditButton)`
  
  .editButton {
    height: 37px;
    border: none;
    background: none;
    cursor: pointer;
    }
`);