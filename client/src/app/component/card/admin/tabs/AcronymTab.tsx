import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminActions } from '../../../../page/actions/AdminActions';
import { AdminStore } from '../../../../page/stores/AdminStore';

interface Props {
  className?: string;
  adminActions?: AdminActions;
  adminStore?: AdminStore;
}

@observer
export class AcronymTab extends React.Component<Props> {
  state = {acronym: '', definition: ''};

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
      this.setState({acronym: '', definition: ''});
    });
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className="addAcronym"
        >
          <input
            value={this.state.acronym}
            className="acronym"
            placeholder="Acronym"
            onChange={(e) => this.onAcronymFieldChange(e)}
          />
          <input
            value={this.state.definition}
            className="acronymDefinition"
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

export const StyledAcronymTab = inject('adminActions', 'adminStore')(styled(AcronymTab)`
.acronym {
  width: 109px;
  height: 22px;
  background: #F6F6F6;
}

.acronymDefinition {
  width: 393px;
  height: 22px;
  background: #F6F6F6;
}

.addAcronym {
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
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