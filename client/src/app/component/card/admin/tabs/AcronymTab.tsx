import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminActions } from '../../../../page/actions/AdminActions';
import { AdminStore } from '../../../../page/stores/AdminStore';
import { StyledAcronym } from '../../../widgets/acronym/Acronym';
import { AcronymActions } from '../../../widgets/acronym/actions/AcronymActions';
import { AcronymStore } from '../../../widgets/acronym/AcronymStore';

interface Props {
  className?: string;
  adminActions?: AdminActions;
  adminStore?: AdminStore;
  acronymActions?: AcronymActions;
  acronymStore?: AcronymStore;
}

@observer
export class AcronymTab extends React.Component<Props> {
  state = {acronym: '', definition: ''};

  async componentDidMount() {
    await this.props.acronymActions!.setAllAcronyms();
  }

  onAcronymFieldChange = (e: any) => {
    this.setState({acronym: e.target.value});
  };

  onDefinitionFieldChange = (e: any) => {
    this.setState({definition: e.target.value});
  };

  async onAddAcronymButtonClick() {
    await this.props.adminStore!.performLoading(async () => {
      this.props.adminActions!.updatePendingAcronym(this.state.acronym, this.state.definition);
      await this.props.adminActions!.addAcronym();
      await this.props.acronymActions!.setAllAcronyms();
      if (document.querySelector('.acronymSearch')) {
        (document.querySelector('.acronymSearch') as HTMLInputElement).value = this.state.acronym;
      }
      await this.props.acronymActions!.setFilteredAcronyms(this.state.acronym);
      this.setState({acronym: '', definition: ''});
    });
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className="acronymTitle"
        >
          Current Acronyms
        </div>
        <input
          className="acronymSearch"
          placeholder="Find Acronym..."
          onChange={async (e) => { await this.props.acronymActions!.setFilteredAcronyms(e.target.value); }}
        />
        <div className="acronymList">
          {
            this.props.acronymStore!.filteredAcronyms &&
            this.props.acronymStore!.filteredAcronyms.map((acronym, index) => {
              return (
                <StyledAcronym
                  acronym={acronym}
                  key={index}
                  className="acronym"
                />
              );
            })
          }
        </div>
        <div
          className="addAcronym"
        >
          <input
            value={this.state.acronym}
            className="acronymAdd"
            placeholder="Acronym"
            onChange={(e) => this.onAcronymFieldChange(e)}
          />
          <input
            value={this.state.definition}
            className="acronymAddDefinition"
            placeholder="Definition"
            onChange={(e) => this.onDefinitionFieldChange(e)}
          />
          <span
            className="addAcronymButton"
            onClick={async () => {
              await this.onAddAcronymButtonClick();
            }}
          >
            Add
          </span>
        </div>
      </div>
    );
  }
}

export const StyledAcronymTab = inject('adminActions', 'adminStore', 'acronymActions', 'acronymStore')
(styled(AcronymTab)`

.acronymTitle {
  font-size: 18px;
  font-family: Amaranth;
  color: #000000;
  margin: auto;
  width: 140px;
  height: 45px;
  line-height: 45px;
}

.acronymAdd {
  width: 109px;
  background: #F6F6F6;
}

.acronymAddDefinition {
  width: 393px;
  height: 22px;
  background: #F6F6F6;
}

.addAcronym {
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
}

.acronymSearch {
  font-family: Amaranth;
  width: 327.5px;
  height: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  border: none;
  margin-left: 11px;
  ::placeholder {
     color: #15191C;
     opacity: .25;
     padding-left: 5px;
  }
}

.acronymList {
  height: 190px;
  width: 557px;
  overflow: auto;
  font-size: 13px;
  background: #FFFFFF;
  color: #000000;
  margin-left: 11px;
}

span {
  color: black;
  text-decoration: underline;
  cursor: pointer;
}

input {
  font-family: Amaranth;
  font-size: 18px;
  border: none;
  ::placeholder {
    color: #B7B7B7;
  }
}
`);