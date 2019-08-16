import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledResource } from './Resource';
import { Category, ResourceModel } from './ResourceModel';
import { Draggable } from 'react-beautiful-dnd';
import { ResourceActions } from './actions/ResourceActions';
import classNames = require('classnames');

interface Props {
  className?: string;
  category: Category;
  resources: ResourceModel[];
  resourceActions: ResourceActions;
}

interface State {
  items: ResourceModel[];
}

@observer
export class ResourceContainer extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: this.props.resources!
    };
  }

  getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    borderBottom: isDragging ? '1px solid black' : 'none',
    height: '39px',

    ...draggableStyle,
  });

  componentWillReceiveProps(newProps: any) {
    this.setState({
      items: newProps.resources!
    });
  }

  renderDrag(resource: ResourceModel, index: number) {
    return (
      <Draggable key={resource.id!.toString()} draggableId={resource.id!.toString()} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={this.getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <StyledResource
              resource={resource}
              key={index}
            />
          </div>
        )}
      </Draggable>
    );
  }

  renderNoDrag(resource: ResourceModel, index: number) {
    return (
      <StyledResource
        resource={resource}
        key={index}
      />
    );
  }

  render() {
    return (
      <div
        className={classNames('resourceList', this.props.className, 'category' + this.props.category)}
      >
        {
          this.state.items &&
          (this.props.category === 0 ?
            this.state.items!
              .sort((a, b) => {
                return a.position! - b.position!;
              })
              .map((resource, index) => {
                return (
                  0 === 0 ?
                    this.renderDrag(resource, index) :
                    this.renderNoDrag(resource, index)
                );
              })
            : this.state.items!.map((resource, index) => {
              return (
                0 === 0 ?
                  this.renderDrag(resource, index) :
                  this.renderNoDrag(resource, index)
              );
            }))
        }
      </div>
    );
  }
}

export const StyledResourceContainer = inject('resourceActions')(styled(ResourceContainer)`
  overflow-y: auto;
  //noinspection CssInvalidPropertyValue
  overflow-y: overlay;
  max-height: 625px;
`);
