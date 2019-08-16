import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledCard } from './Card';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { ProfileActions } from '../../profile/ProfileActions';
import { ResourceStore } from '../resource/stores/ResourceStore';
import { StyledTabContainer } from './TabContainer';
import { Category, ResourceModel } from '../resource/ResourceModel';
import { DragDropContext } from 'react-beautiful-dnd';
import { ProfileStore } from '../../profile/ProfileStore';
import classNames = require('classnames');

interface Props {
  className?: string;
  resourceActions?: ResourceActions;
  resourceStore?: ResourceStore;
  profileActions?: ProfileActions;
  profileStore?: ProfileStore;
}

@observer
export class CardContainer extends React.Component<Props> {

  async componentDidMount() {
    await this.props.resourceActions!.setAllResources();
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

  onDragEnd = async (result: any) => {
    let eles = document.querySelectorAll('.resourceList');
    if (eles) {
      for (let i = 0; i < eles.length; i++) {
        if (((eles[i] as HTMLElement).parentNode as HTMLElement).style.opacity === '0') {
          ((eles[i] as HTMLElement).parentNode! as HTMLElement).style.opacity = '1.0';
        }
      }
      if (!result.destination) {
        return;
      }

      if (result.destination !== null && result.destination.droppableId === 'category0') {
        let res = this.props.resourceStore!.resources.filter(
          (r) => {
            return r.id!.toString() === result.draggableId;
          })[0];
        if (res) {
          let fav = new ResourceModel(
            null, res.url, res.name, 0, this.props.profileStore!.profile.cardID, result.destination.index
          );
          if (result.source.droppableId !== 'category0') {
            let targetIdx = result.destination.index;
            let resources = this.props.resourceStore!.resources.filter((r) => {
              return r.categoryID === 0;
            });
            resources.map((r: ResourceModel) => {
              if (r.position !== null && r.categoryID === 0) {
                if (r.position! >= targetIdx) {
                  r.setPosition(r.position + 1);
                }
              }
            });
            await this.props.resourceActions!.saveFavorite(fav);
            this.props.resourceStore!.updateFavoritePositions(resources);
            await this.props.resourceActions!.updateGivenResources(resources);
            await this.props.resourceActions!.sortResources();
          } else {
            if (res.position === result.destination.index) {
              return;
            }
            let items: ResourceModel[] = [];
            this.props.resourceStore!.resources
              .filter((r) => {
                return r.categoryID === 0;
              })
              .sort((a, b) => {
                return a.position! - b.position!;
              })
              .map((r, index) => {
                r.setPosition(index);
                return r;
              })
              .map((r) => {
                if (r.categoryID === 0) {
                  if (r.id === res.id) {
                    r.setPosition(result.destination.index);
                    items.push(r);
                  } else if (result.source.index > result.destination.index) {
                    if (r.position! >= result.destination.index) {
                      r.setPosition(r.position! + 1);
                      items.push(r);
                    }
                  } else if (result.source.index <= result.destination.index) {
                    if (r.position! <= result.destination.index) {
                      r.setPosition(r.position! - 1);
                      items.push(r);
                    }
                  }
                }
              });
            this.props.resourceStore!.updateFavoritePositions(items);
            await this.props.resourceActions!.updateGivenResources(items);
            await this.props.resourceActions!.sortResources();
          }
        }
      }
    }
  };

  onDragStart = (e: any) => {
    let eles = document.querySelectorAll('.resourceList');
    if (eles) {
      for (let i = 0; i < eles.length; i++) {
        if (!(eles[i] as HTMLElement).classList.contains(e.source.droppableId) &&
          !(eles[i] as HTMLElement).classList.contains('category0')) {
          ((eles[i] as HTMLElement).parentNode! as HTMLElement).style.opacity = '0.0';
        }
      }
    }
  };

  render() {
    return (
      <div
        className={classNames('cardContainer', this.props.className)}
        style={
          this.props.profileStore!.profile && this.props.profileStore!.profile.widgetsVisible !== 1 ?
            {width: '99.1vw'} : {width: 'calc(99.1vw - 354px'}
        }
      >
        <StyledTabContainer profileActions={this.props.profileActions}/>
        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
          <div
            className="cardBody"
          >
            <StyledCard
              category={this.props.resourceStore!.activeTab * 3 - 2}
              resources={
                this.props.resourceStore!.returnResourcesInCategory(this.props.resourceStore!.activeTab * 3 - 2)}
            />
            <StyledCard
              category={this.props.resourceStore!.activeTab * 3 - 1}
              resources={
                this.props.resourceStore!.returnResourcesInCategory(this.props.resourceStore!.activeTab * 3 - 1)}
            />
            <StyledCard
              category={this.props.resourceStore!.activeTab * 3}
              resources={
                this.props.resourceStore!.returnResourcesInCategory(this.props.resourceStore!.activeTab * 3)}
            />
            <StyledCard
              className="myFavorites"
              category={Category.Favorites}
              resources={this.props.resourceStore!.resources.filter((r) => {
                return r.categoryID === 0;
              })}
            />
          </div>
        </DragDropContext>
      </div>
    );
  }
}

export const StyledCardContainer = inject('resourceActions', 'profileActions', 'resourceStore', 'profileStore')
(styled(CardContainer)`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  margin-top: 30px;
  top: 5px;
  width: 100%;
  
  .cardBody {
    background: #1F2226;
    display: flex;
    padding-top: 6px;
    padding-right: 8px;
    height: 770px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
    border-radius: 0 4px 4px 4px;
    flex: 1;
  }
  
  .tabContainer {
    width: 100%;
    display: flex;
    align-items: flex-end;
  }
`);
