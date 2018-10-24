import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  acronym: string;
  definition: string;
  className?: string;
}

@observer
export class Acronym extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        {this.props.acronym} - {this.props.definition}
      </div>
    );
  }
}

export const StyledAcronym = styled(Acronym)``;