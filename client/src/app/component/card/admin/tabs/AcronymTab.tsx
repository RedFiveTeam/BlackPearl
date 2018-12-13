import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminActions } from '../../../../page/actions/AdminActions';
import { AdminStore } from '../../../../page/stores/AdminStore';
import { StyledAcronym } from '../../../widgets/acronym/Acronym';
import { AcronymActions } from '../../../widgets/acronym/actions/AcronymActions';
import { AcronymStore } from '../../../widgets/acronym/AcronymStore';
import { StyledDeleteAcronymPopup } from '../../../popup/DeleteAcronymPopup';
import { AcronymModel } from '../../../widgets/acronym/AcronymModel';

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
  pendingDelete = {id: '', value: ''};
  node: any = this.node;

  async componentDidMount() {
    await this.props.acronymActions!.setAllAcronyms();
    document.addEventListener('click', this.handleSelect, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleSelect);
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

  deleteOnClick() {
    if (this.pendingDelete.id.length > 0) {
      this.props.acronymStore!.setPendingDelete(
        new AcronymModel(
          parseInt(this.pendingDelete.id, 10),
          this.pendingDelete.value.substr(0, this.pendingDelete.value.indexOf(' - ')),
          '',
          this.pendingDelete.value
        )
      );
    }
  }

  clickAcronym(e: any) {
    return;
  }

  handleSelect = (e: any) => {
    if (this.node && this.node.contains(e.target) && e.target.children.length > 0) {
      e = e.target as HTMLElement;
      e.focus();
      if (e.nodeName === 'DIV') {
        e = e.querySelector('span');
      }
      const html = e.innerHTML;
      const div = document.createElement('div');
      div.innerHTML = html;
      const text = div.textContent || div.innerText || '';
      this.pendingDelete.id = e.id;
      this.pendingDelete.value = text;
      let deleteButton = (document.querySelector('.deleteAcronymButton') as HTMLButtonElement);
      deleteButton.style.cursor = 'pointer';
      deleteButton.style.background = '#854646';
      deleteButton.style.color = '#fff';
      return;
    }
    if (e.target.classList.contains('deleteButton')) {
      return;
    } else {
      this.pendingDelete = {id: '', value: ''};
      let deleteButton = (document.querySelector('.deleteAcronymButton') as HTMLButtonElement);
      deleteButton.style.cursor = 'no-select';
      deleteButton.style.background = '#C4C4C4';
      deleteButton.style.color = '#000';
    }
  };

  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.acronymStore!.pendingDelete &&
          <StyledDeleteAcronymPopup/>
        }
        <div
          className="acronymTitle"
        >
          Current Acronyms
        </div>
        <input
          className="acronymSearch"
          placeholder="Find Acronym..."
          onChange={async (e) => {
            let value = e.target.value;
            await this.props.acronymActions!.setFilteredAcronyms(value);
            await this.props.acronymStore!.setSearch(value);
          }}
          value={this.props.acronymStore!.search}
        />
        <div
          className="acronymList"
          ref={node => this.node = node}
        >
          {
            this.props.acronymStore!.filteredAcronyms &&
            this.props.acronymStore!.filteredAcronyms.map((acronym, index) => {
              return (
                <StyledAcronym
                  acronym={acronym}
                  key={index}
                  className="acronym"
                  onClick={(e: any) => {
                    this.clickAcronym.bind(this);
                    this.clickAcronym(e);
                  }}
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
        <button
          className="deleteAcronymButton"
          onClick={() => {
            this.deleteOnClick.bind(this);
            this.deleteOnClick();
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}

export const StyledAcronymTab = inject('adminActions', 'adminStore', 'acronymActions', 'acronymStore')
(styled(AcronymTab)`

.deleteAcronymButton {
  cursor: not-allowed;
  background: #C4C4C4;
  outline: none;
  font-family: Amaranth;
  font-size: 18px;
  position: absolute;
  bottom: 9px;
  right: 148px;
  width: 131px;
  height: 26px;
  line-height: 21px;
  display: flex;
  justify-content: center;
}

.acronymTitle {
  font-size: 18px;
  font-family: Amaranth;
  color: #000000;
  margin: auto;
  width: 140px;
  height: 45px;
  line-height: 45px;
}

.acronym:focus {
  background-color: lightblue;
  outline: none;
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
  cursor: pointer;
}

.searchMatch {
  text-decoration: underline;
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