import * as React from 'react';
import { observer } from 'mobx-react';
import { ResourceStore } from './stores/ResourceStore';

interface Props {
  resourceStore?: ResourceStore;
  name: string;
  url: string;
  className: string;
}

@observer
export class Resource extends React.Component<Props> {
  render() {
    return(
      <div className={this.props.className}>
        <a href={this.props.url} target="_blank">{this.props.name}</a>
      </div>
    );
  }
}
