import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledInformationCard } from './InformationCard';
import { InformationStore } from './InformationStore';
import { InformationActions } from './actions/InformationActions';

interface Props {
  className?: string;
  informationStore?: InformationStore;
  informationActions?: InformationActions;
}

@observer
export class InformationContainer extends React.Component<Props> {
  async componentDidMount() {
    await this.props.informationActions!.setupInformation();
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledInformationCard
          imageServer={this.props.informationStore!.imageServer}
          callOutFormat={this.props.informationStore!.callOutFormat}
          imageServerJWICS={this.props.informationStore!.imageServerJWICS}
          auabServer={this.props.informationStore!.auabServer}
          navcentServer={this.props.informationStore!.navcentServer}
          dsnNumber={this.props.informationStore!.dsnNumber}
          svoipNumber={this.props.informationStore!.svoipNumber}
          tsvoipNumber={this.props.informationStore!.tsvoipNumber}
          jwicsServer={this.props.informationStore!.jwicsServer}
        />
      </div>
    );
  }
}

export const StyledInformationContainer = inject('informationStore', 'informationActions')(styled(InformationContainer)`
display: flex;
position: relative;
width: 100%;
`);