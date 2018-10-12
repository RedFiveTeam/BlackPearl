import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from './stores/ResourceStore';
import styled from 'styled-components';
import { ResourceActions } from './actions/ResourceActions';
import { StyledResource } from './Resource';

interface Props {
  resourceStore?: ResourceStore;
  resourceActions?: ResourceActions;
  className?: string;
}

@observer
export class ResourceList extends React.Component<Props> {
  async componentDidMount() {
    await this.props.resourceActions!.setAllResources();
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.resourceStore!.resources.map((resource) => {
            return (
              <StyledResource
                key={resource.id!}
                name={resource.name}
                url={resource.url}
                className="resource"
              />
            );
          })
        }
      </div>
    );
  }
}

export const StyledResourceList = inject('resourceStore', 'resourceActions')(styled(ResourceList)`
overflow-y: auto;
max-height: 819px;
//::-webkit-scrollbar {
//    //width: 0px;
//    //background: transparent; /* make scrollbar transparent */
//}
`);