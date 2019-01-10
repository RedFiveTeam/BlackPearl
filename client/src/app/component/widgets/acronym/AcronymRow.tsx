import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { AcronymModel } from './AcronymModel';

interface Props {
  acronym: AcronymModel;
  className?: string;
}

@observer
export class AcronymRow extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
        dangerouslySetInnerHTML={{__html: this.props.acronym.printString}}
      />
    );
  }
}

export const StyledAcronymRow = styled(AcronymRow)`
 .searchMatch {
    background: #5689F3;
  }
`;