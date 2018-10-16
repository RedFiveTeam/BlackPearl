import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from './stores/ResourceStore';
import styled from 'styled-components';
import { ResourceActions } from './actions/ResourceActions';
import { StyledResource } from './Resource';
import { Category } from './ResourceModel';

interface Props {
  resourceStore?: ResourceStore;
  resourceActions?: ResourceActions;
  className?: string;
  category: Category;
}

@observer
export class ResourceList extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        {
          this.props.resourceStore!.returnResourcesInCategory(this.props.category).map((resource) => {
            return (
              <StyledResource
                resource={resource}
                key={resource.id!}
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
//    width: 0px;
//    background: transparent; /* make scrollbar transparent */
//}
`);