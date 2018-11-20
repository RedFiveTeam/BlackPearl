import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AdminStore } from './stores/AdminStore';
import { AdminActions } from './actions/AdminActions';
import { StyledAdminCardContainer } from '../component/card/admin/AdminCardContainer';

interface Props {
  adminStore?: AdminStore;
  adminActions?: AdminActions;
  className?: string;
}

@observer
export class AdminPage extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledAdminCardContainer/>
      </div>
    );
  }
}

export const StyledAdminPage = inject('adminStore', 'adminActions')(styled(AdminPage)`
`);