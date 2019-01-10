import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledDeleteAcronymButton } from '../../button/DeleteAcronymButton';
import { AcronymModel } from './AcronymModel';
import { action } from 'mobx';

interface Props {
  acronym: AcronymModel;
  className?: string;
  onDeleteClick: (e: any) => void;
}

@observer
export class AdminAcronymRow extends React.Component<Props> {
  @action.bound
  deleteClicked() {
    this.props.onDeleteClick(this.props.acronym);
  }

  render() {
    return (
      <tr
        className={this.props.className}
      >
        <td
          className="acronymColumn"
        >
          {this.props.acronym.acronym}
        </td>
        <td
          className="definitionColumn"
        >
          {this.props.acronym.definition}
        </td>
        <td
          className="actionColumn"
        >
          <StyledDeleteAcronymButton
            onClick={this.deleteClicked}
          />
        </td>
      </tr>
    );
  }
}

export const StyledAdminAcronymRow = styled(AdminAcronymRow)`

td {
  border-bottom: 1px solid #38404B;
  line-height: 45px;
}

.deleteAcronymButton {
  background: none;
  border: none;
  cursor: pointer;
}
`;