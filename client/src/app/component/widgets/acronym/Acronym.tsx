import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  acronym: string | null;
  className?: string;
  onClick: (e: any) => void;
}

@observer
export class Acronym extends React.Component<Props> {
   render() {
    return (
      <div
        tabIndex={-1}
        className={this.props.className}
        dangerouslySetInnerHTML={{ __html: this.props.acronym ? this.props.acronym : '' }}
        onClick={(e) => this.props.onClick((e.target as HTMLElement))}
      />
    );
  }
}

export const StyledAcronym = styled(Acronym)`

`;