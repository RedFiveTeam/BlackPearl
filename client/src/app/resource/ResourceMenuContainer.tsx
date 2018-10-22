import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledThreeDotButton } from '../component/button/ThreeDotButton';
import { StyledDeleteButton } from '../component/button/DeleteButton';
import { StyledEditButton } from '../component/button/EditButton';
import { BorderIcon } from '../icon/BorderIcon';
import { ResourceModel } from './ResourceModel';

interface Props {
  className?: string;
  resource: ResourceModel;
}

interface State {
  menuVisible: boolean;
}

@observer
export class ResourceMenuContainer extends React.Component<Props, State> {
  state = {menuVisible: false};

  toggleMenuVisible = () => {
    this.setState({menuVisible: !this.state.menuVisible});
  };

  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.state.menuVisible &&
          <StyledEditButton
              resource={this.props.resource}
          />
        }
        {
          this.state.menuVisible &&
          <BorderIcon/>
        }
        {
          this.state.menuVisible &&
          <StyledDeleteButton
              resource={this.props.resource}
          />
        }
        <StyledThreeDotButton
          onClick={this.toggleMenuVisible}
          resource={this.props.resource}
        />
      </div>
    );
  }
}

export const StyledResourceMenuContainer = styled(ResourceMenuContainer)`
width: 81px;
display: flex;
align-items: center;
justify-content: flex-end;
`;