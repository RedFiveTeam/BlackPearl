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

interface Props {
  className?: string;
  adminActions?: AdminActions;
  adminStore?: AdminStore;
  acronymActions?: AcronymActions;
  acronymStore?: AcronymStore;
}

@observer
export class AcronymTab extends React.Component<Props> {
  async componentDidMount() {
    await this.props.acronymActions!.setAllAcronyms();
  }

  onAcronymFieldChange = (e: any) => {
    this.setState({acronym: e.target.value});
  };

  onDefinitionFieldChange = (e: any) => {
    this.setState({definition: e.target.value});
  };

  onDeleteClick(acronym: AcronymModel) {
    this.props.acronymStore!.setPendingDelete(acronym);
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
        <div
          className="acronymTables"
        >
          <table
            className="headerTable"
          >
            <tbody>
            <tr>
              <td>Acronym</td>
              <td>Definition</td>
              <td>Actions</td>
            </tr>
            </tbody>
          </table>
          <div
            className="acronymList"
          >
            <table>
              <tbody>
              {
                this.props.acronymStore!.filteredAcronyms &&
                this.props.acronymStore!.filteredAcronyms.map((acronym, index) => {
                  return (
                    <StyledAdminAcronymRow
                      acronym={acronym}
                      onDeleteClick={(a: AcronymModel) => {
                        this.onDeleteClick(a);
                      }}
                      key={index}
                    />
                  );
                })
              }
              </tbody>
            </table>
          </div>
        </div>
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

.acronymTables {
  width: 90%;
  height: 425px;
  margin: 15px auto auto auto;
  background: #292E33;
  border-radius: 4px;
  
  table {
    width: 90%;
    margin: auto;
    border-spacing: 0;
    border-collapse: collapse;
    
    td:nth-of-type(1) {
      width: 15%;
    }
    td:nth-of-type(2) {
      width: 80%
    }
    td:nth-of-type(3) {
      width: 5%;
    }
  }
  
  .headerTable {
    border-radius: 4px 4px 0px 0px;
    width: 100%;
    height: 40px;
    background: #000000;
    tr {
      font-size: 18px;
      color: #93A7C3;
    }
        
    td:nth-of-type(1) {
      padding-left: 5%;
    }
    td:nth-of-type(2) {
      padding-left: 3.5%;
    }
    td:nth-of-type(3) {
      line-height: 40px;
      position: absolute;
      right: 0;
      margin-right: 6%;
    }
  }
  
  .acronymList {
    max-height: 385px;
    overflow-y: auto;
    
    td:last-of-type {
      text-align: right;
    }
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