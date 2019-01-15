import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { AcronymModel } from './AcronymModel';
import { action } from 'mobx';
import { DeleteIcon } from '../../../icon/DeleteIcon';
import { StyledButton } from '../../button/Button';
import { EditIcon } from '../../../icon/EditIcon';
import { ConfirmIcon } from '../../../icon/ConfirmIcon';
import { CancelIcon } from '../../../icon/CancelIcon';

interface Props {
  acronym: AcronymModel;
  className?: string;
  onDeleteClick: (e: any) => void;
  onSaveClick: (e: any) => void;
  onEditClick: (i: number) => void;
  clearEdit: boolean;
}

interface State {
  pendingEditAcronym: AcronymModel;
}

@observer
export class AdminAcronymRow extends React.Component<Props, State> {
  state = {pendingEditAcronym: new AcronymModel()};

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (nextProps.clearEdit) {
      this.cancelClicked();
    }
  }

  @action.bound
  async deleteClicked() {
    await this.props.onDeleteClick(this.props.acronym);
  }

  @action.bound
  async editClicked() {
    await this.props.onEditClick(this.props.acronym.id!);
    this.setState({
      pendingEditAcronym: new AcronymModel(
        this.props.acronym.id,
        this.props.acronym.acronym,
        this.props.acronym.definition,
        this.props.acronym.printString
      )
    });
  }

  @action.bound
  confirmClicked() {
    this.props.onSaveClick(this.state.pendingEditAcronym);
    this.setState({pendingEditAcronym: new AcronymModel()});
  }

  @action.bound
  cancelClicked() {
    this.setState({pendingEditAcronym: new AcronymModel()});
  }

  editStateButtons() {
    return (
      <div>
        <StyledButton
          onClick={this.confirmClicked}
          className="confirmAcronymButton"
        >
          <ConfirmIcon/>
        </StyledButton>
        <StyledButton
          onClick={this.cancelClicked}
          className="cancelAcronymButton"
        >
          <CancelIcon/>
        </StyledButton>
      </div>
    );
  }

  normalStateButtons() {
    return (
      <div>
        <StyledButton
          onClick={this.editClicked}
          className="editAcronymButton"
        >
          <EditIcon/>
        </StyledButton>
        <StyledButton
          onClick={this.deleteClicked}
          className="deleteAcronymButton"
        >
          <DeleteIcon/>
        </StyledButton>
      </div>
    );
  }

  render() {
    return (
      <tr
        className={this.props.className}
      >
        <td
          className="acronymColumn"
        >
          {
            this.state.pendingEditAcronym.id ?
              <input
                placeholder={this.props.acronym.acronym}
                value={this.state.pendingEditAcronym.acronym}
                onChange={(e) => this.state.pendingEditAcronym.setAcronym(e.target.value)}
              /> :
              this.props.acronym.acronym
          }
        </td>
        <td
          className="definitionColumn"
        >
          {
            this.state.pendingEditAcronym.id ?
              <input
                placeholder={this.props.acronym.definition}
                value={this.state.pendingEditAcronym.definition}
                onChange={(e) => this.state.pendingEditAcronym.setDefinition(e.target.value)}
              /> :
              this.props.acronym.definition
          }
        </td>
        <td
          className="actionColumn"
        >
          {
            this.state.pendingEditAcronym.id ?
              this.editStateButtons() :
              this.normalStateButtons()
          }
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

button {
  background: none;
  border: none;
  cursor: pointer;
}
`;