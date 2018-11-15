import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledResource } from './Resource';
import { Category, ResourceModel } from './ResourceModel';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import classNames = require('classnames');
import { ResourceActions } from './actions/ResourceActions';

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
    this.onDragEnd = this.onDragEnd.bind(this);
    this.reorder = this.reorder.bind(this);
  }

  reorder = async (list: ResourceModel[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    result.map((obj, index) => {
      obj.setPosition(index);
    });
    return result;
  };

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

  async onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    const items = await this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });

    await this.props.resourceActions.updateGivenResources(items);
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
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {
            (provided) => (
              <div
                className={classNames('resourceList', this.props.className)}
                ref={provided.innerRef}
              >
                {
                  this.state.items &&
                  this.state.items!.map((resource, index) => {
                    return (
                      this.props.category === 0 ?
                        this.renderDrag(resource, index) :
                        this.renderNoDrag(resource, index)
                    );
                  })
                }
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    );
  }
}

export const StyledResourceContainer = inject('resourceActions')(styled(ResourceContainer)`
  overflow-y: auto;
  max-height: calc(600px - 38px - 32px - 10px);
`);