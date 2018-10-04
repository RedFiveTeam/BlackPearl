import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ResourceStore } from './stores/ResourceStore';
import styled from 'styled-components';
import { ResourceActions } from './actions/ResourceActions';
import { Resource } from './Resource';
import { StyledAddResourceButton } from '../component/button/AddResourceButton';

interface Props {
  resourceStore?: ResourceStore;
  resourceActions?: ResourceActions;
}

@observer
export class ResourceList extends React.Component<Props> {
  async componentDidMount() {
    await this.props.resourceActions!.setAllResources();
  }

  render() {
    return (
      <div>
        {
          this.props.resourceStore!.resources.map((resource) => {
            return (
              <Resource
                key={resource.id!}
                name={resource.name}
                url={resource.url}
                className="resource"
              />
            );
          })
        }
        <StyledAddResourceButton
          className="addResourceButton"
        />
      </div>
    );
  }
}

export const StyledResourceList = inject('resourceStore', 'resourceActions')(styled(ResourceList)``);