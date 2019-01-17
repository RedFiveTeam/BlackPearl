import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from '../../../../page/stores/AdminStore';
import { InformationModel } from '../../information/InformationModel';
import { AdminActions } from '../../../../page/actions/AdminActions';

interface Props {
  className?: string;
  adminStore?: AdminStore;
  adminActions?: AdminActions;
}

@observer
export class GeneralInfoTab extends React.Component<Props> {
  getPlaceholder(index: number) {
    if (index <= 3) {
      return 'Server Address';
    } else if (index <= 6) {
      return 'Phone Number';
    } else if (index <= 7) {
      return 'Format';
    } else {
      return 'Server Address';
    }
  }

  generateInformationRows() {
    return (
      <div>
        <table>
          <tbody>
          {
            this.props.adminStore!.pendingInformation.map((i: InformationModel, index: number) => {
              return (
                <tr className="information" key={index}>
                  <td className="informationName">
                    {i.name}
                  </td>
                  <td
                    className="informationContent"
                  >
                    <input
                      value={i.content}
                      maxLength={64}
                      onChange={(e) => this.props.adminStore!.setPendingInformationContent(index, e.target.value)}
                      placeholder={this.getPlaceholder(index)}
                    />
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
        {this.props.children}
      </div>
    );
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.adminStore!.pendingInformation &&
          this.generateInformationRows()
        }
      </div>
    );
  }
}

export const StyledGeneralInfoTab = inject('adminStore', 'adminActions')(styled(GeneralInfoTab)`
margin-top: 10px;

table {
  border-collapse: collapse;
  width: 95%;
}

tr {
  height: 65px;
}

.informationName {
  width: 30%;
  height: 18px;
  line-height: 18px;
  padding-left: 62px;
}

.informationContent {
  width: 60%;
}

.informationContent > input {
  border: none;
  font-size: 18px;
  height: 36px;
  width: 100%;
  background: none;
  border-bottom: 1px solid #93A7C3;
  color: white;
  ::placeholder {
    font-size: 14px;
    color: #93A7C3;
  }
}
`);