import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  id?: string;
  className?: string;
  selected?: boolean;
  name: string;
  clickAction: () => void;
}

@observer
export class ListRow extends React.Component<Props> {
  clickComponent() {
    this.props.clickAction();
  }

  render() {
    return (
      <div
        className={this.props.className + ' listRow'  + (this.props.selected === true ? ' selected' : '')}
        onClick={() => {
          this.clickComponent();
        }}
      >
        {this.props.name}
      </div>
    );
  }
}

export const StyledListRow = styled(ListRow)`
  

`;