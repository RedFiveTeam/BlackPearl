import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from './stores/ResourceStore';
import styled from 'styled-components';
import { ResourceActions } from './actions/ResourceActions';
import { StyledResource } from './Resource';
import { Category } from './ResourceModel';
import classNames = require('classnames');

interface Props {
  resourceStore?: ResourceStore;
  resourceActions?: ResourceActions;
  className?: string;
  category: Category;
}

@observer
export class ResourceContainer extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('resourceList', this.props.className)}>
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

export const StyledResourceContainer = inject('resourceStore', 'resourceActions')(styled(ResourceContainer)`
  overflow-y: auto;
  max-height: calc(600px - 38px - 32px - 10px);
`);