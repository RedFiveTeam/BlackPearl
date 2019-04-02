import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ProfileModel } from '../../profile/ProfileModel';
import { StyledListRow } from './ListRow';
import { ProfileStore } from '../../profile/ProfileStore';

interface Props {
  className?: string;
  profileStore?: ProfileStore;
  accountList: ProfileModel[];
}

@observer
export class AccountList extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className={'accountList'}>
          {this.props.accountList.map((p: ProfileModel, idx) => {
            return (
              <StyledListRow
                key={idx}
                name={p.cardID}
                selected={
                  this.props.profileStore!.selectedProfile &&
                  this.props.profileStore!.selectedProfile.cardID === p.cardID
                }
                clickAction={() => {
                  this.props.profileStore!.setSelectedProfile(p);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export const StyledAccountList = inject('profileStore')(styled(AccountList)`
`);