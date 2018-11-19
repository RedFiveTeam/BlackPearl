import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  className?: string;
  title: string;
  description: string;
  address: string;
}

@observer
export class Operation extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className + ' operation'}
      >
        <a
          className="address"
          href={this.props.address}
          target="_blank"
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
        </a>
      </div>
    );
  }
}

export const StyledOperation = styled(Operation)`
  height: 62px;
  font-size: 24px;
  background: #FFFFFF;
  font-family: Amaranth;
  margin-top: 5px;
  border-radius: 2px;
  white-space: nowrap;
  
  .title {
    width: 250px;
    margin-left: 16px;
  }
  
  .description {
    width: 800px;
    color: #474747;
  }
  
  a {
  height: 60px;
  align-items: center;
  margin-top: 17px;
  text-decoration: none;
  color: black;
  display: inline-flex;
  }
`;