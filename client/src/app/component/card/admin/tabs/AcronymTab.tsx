import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminActions } from '../../../../page/actions/AdminActions';
import { AdminStore } from '../../../../page/stores/AdminStore';
import { AcronymActions } from '../../../widgets/acronym/actions/AcronymActions';
import { AcronymStore } from '../../../widgets/acronym/AcronymStore';
import { StyledDeleteAcronymPopup } from '../../../popup/DeleteAcronymPopup';
import { StyledAdminAcronymRow } from '../../../widgets/acronym/AdminAcronymRow';
import { AcronymSearchIcon } from '../../../../icon/AcronymSearchIcon';
import { PlusIcon } from '../../../../icon/PlusIcon';
import { AcronymModel } from '../../../widgets/acronym/AcronymModel';
import { StyledAddAcronymPopup } from '../../../popup/AddAcronymPopup';
import { action } from 'mobx';

interface Props {
  className?: string;
  adminActions?: AdminActions;
  adminStore?: AdminStore;
  acronymActions?: AcronymActions;
  acronymStore?: AcronymStore;
}

interface State {
  clearEdit: boolean;
  openID: number;
}

@observer
export class AcronymTab extends React.Component<Props, State> {
  state = {clearEdit: false, openID: -1};

  async componentDidMount() {
    await this.props.acronymActions!.setAllAcronyms();
  }

  async onDeleteClick(acronym: AcronymModel) {
    this.props.acronymStore!.setPendingDelete(acronym);
    await this.setState({clearEdit: true, openID: -1});
    await this.setState({clearEdit: false});
  }

  async onSaveClick(acronym: AcronymModel) {
    await this.props.acronymActions!.updateAcronym(acronym);
    const objDiv = document.getElementById('scrollBody');
    objDiv!.scrollTop = 0;
    await this.setState({clearEdit: true, openID: -1});
    await this.setState({clearEdit: false});
  }

  @action.bound
  async onEditClick(i: number) {
    await this.setState({clearEdit: true, openID: i});
    await this.setState({clearEdit: false});
  }

  onAddClick() {
    this.props.acronymStore!.setPendingAcronym(new AcronymModel());
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.acronymStore!.pendingDelete &&
          <StyledDeleteAcronymPopup/>
        }
        {
          this.props.acronymStore!.pendingAcronym &&
          <StyledAddAcronymPopup/>
        }
        <div
          className="acronymTitle"
        >
          Current Acronyms
        </div>
        <div
          className="acronymSearch"
        >
          <AcronymSearchIcon/>
          <input
            placeholder="Find Acronym..."
            onChange={async (e) => {
              let value = e.target.value;
              await this.props.acronymActions!.setFilteredAcronyms(value);
              await this.props.acronymStore!.setSearch(value);
            }}
            value={this.props.acronymStore!.search}
          />
        </div>
        <table>
          <thead>
          <tr>
            <th>Acronym</th>
            <th>Definition</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody id="scrollBody">
          {
            this.props.acronymStore!.filteredAcronyms &&
            this.props.acronymStore!.filteredAcronyms.map((acronym, index) => {
              return (
                <StyledAdminAcronymRow
                  acronym={acronym}
                  onDeleteClick={async (a: AcronymModel) => {
                    await this.onDeleteClick(a);
                  }}
                  onSaveClick={async (a: AcronymModel) => {
                    await this.onSaveClick(a);
                  }}
                  onEditClick={(i: number) => this.onEditClick(i)}
                  clearEdit={this.state.openID === acronym.id ? false : this.state.clearEdit}
                  key={index}
                />
              );
            })
          }
          </tbody>
        </table>
        <button
          className="addAcronymButton"
          onClick={() => {
            this.onAddClick();
          }}
        >
          <PlusIcon/>
          <div>ADD NEW</div>
        </button>
      </div>
    );
  }
}

export const StyledAcronymTab = inject('adminActions', 'adminStore', 'acronymActions', 'acronymStore')
(styled(AcronymTab)`

.acronymTitle {
  font-size: 24px;
  text-align: center;
  margin: 15px 0 25px 0;
}

.acronymSearch {
  width: 240px;
  margin-left: 64px;
  border-bottom: 1px solid #93A7C3;
  
  input {
    background: none;
    border: none;
    outline: none;
    line-height: 25px;
    font-size: 18px;
    color: #FFFFFF;
    text-indent: 10px;
  }
}

table {
  width: 90%;
  height: 425px;
  margin: 15px auto auto auto;
  background: #292E33;
  border-radius: 4px;
  
  
          thead {
            color: #93A7C3;
            width: 100%;
            display: table;
            border-radius: 4px 4px 0 0;
            background: #000000;
            height: 40px;
    
        th {
            text-align: left;
            border-spacing: 0;
            border-collapse: collapse;
        }
    
        th:nth-of-type(1) {
          width: 19.4%;
          padding-left: 3%;
        }
        
        th:nth-of-type(2) {
          width: 53.5%;
        }
    
        th:nth-of-type(3) {
          width: 11.5%;
        }
    
        }
  
  tbody {
    width: 100%;
    display: block;
    overflow-y: auto;
    max-height: 385px;
    margin: auto;
    
    tr {
      display: table;
      table-layout: fixed;
      width: 94%;
      margin: auto;
        td:nth-of-type(1) {
    width: 20%;
  }
  td:nth-of-type(2) {
    width: 70%
  }
  td:nth-of-type(3) {
    width: 10%;
  }
    }
  }
  
  input {
    width: 95%;
    border-radius: 4px;
    outline: none;
    border: none;
  }
}

.addAcronymButton {
  width: 116px;
  height: 36px;
  border: none;
  background: linear-gradient(180deg, #679CF6 0%, #4072EE 100%);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  font-size: 14px;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 3.5%;
  bottom: 43px;
  outline: none;
  
  div {
    padding-left: 10px;
  }
}
`);