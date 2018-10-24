import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  acronym: string | null;
  className?: string;
}

@observer
export class Acronym extends React.Component<Props> {

  test() {
    return { __html: this.props.acronym ? this.props.acronym : '' };
  }

  render() {
    return (
      <div
        className={this.props.className}
        dangerouslySetInnerHTML={this.test()}
      />
    );
  }
}

export const StyledAcronym = styled(Acronym)``;