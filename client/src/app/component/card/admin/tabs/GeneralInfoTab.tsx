import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from '../../../../page/stores/AdminStore';
import { InformationModel } from '../../information/InformationModel';

interface Props {
  className?: string;
  adminStore?: AdminStore;
}

@observer
export class GeneralInfoTab extends React.Component<Props> {
  generateInformationRows() {
    return (
      <div>
        <table>
          <tbody>
          {
            this.props.adminStore!.information.map((i: InformationModel, index: number) => {
              return (
                <tr className="information" key={index}>
                  <td className="informationName">
                    {i.name}
                  </td>
                  <td>
                    <input
                      className="informationContent"
                      value={i.content}
                      onChange={(e) => this.props.adminStore!.setInformationContent(index, e.target.value)}
                    />
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.adminStore!.information &&
          this.generateInformationRows()
        }
      </div>
    );
  }
}

export const StyledGeneralInfoTab = inject('adminStore')(styled(GeneralInfoTab)`

margin-top: 10px;
margin-left: 16px;


table {
  border-collapse: collapse;
  width: 547px;
}

tr {
  height: 35px;
}

.information td {
  border-top: 1px solid #DFDFDF;
  border-bottom: 1px solid #DFDFDF;
}

.informationName {
  width: 174px;
  height: 18px;
  line-height: 18px;
  padding-left: 18px;
}

.informationContent {
  border: none;
  margin-left: 19px;
  font-size: 18px;
  width: 322px;
  border-radius: 5px;
  height: 18px;
}
`);