import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  className?: string;
  title: string;
  description: string;
}

@observer
export class Operation extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className + ' operation'}
      >
        <div
          className="title"
        >
          {this.props.title}
        </div>
        <div
          className="description"
        >
          {this.props.description}
        </div>
      </div>
    );
  }
}

export const StyledOperation = styled(Operation)`
  height: 62px;
  line-height: 62px;
  font-size: 24px;
  background: #FFFFFF;
  font-family: Amaranth;
  margin-top: 5px;
  border-radius: 2px;
  display: flex;
  white-space: nowrap;
  
  .title {
    width: 250px;
    margin-left: 16px;
  }
  
  .description {
    width: 800px;
    color: #474747;
  }
`;