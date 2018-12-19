import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ResourceStore } from '../resource/stores/ResourceStore';
import { ProfileStore } from '../../profile/ProfileStore';
import { ProfileActions } from '../../profile/ProfileActions';
import { SearchIcon } from '../../icon/SearchIcon';
import { DropdownIcon } from '../../icon/DropdownIcon';
import { Sort } from '../resource/ResourceModel';
import { ResourceActions } from '../resource/actions/ResourceActions';
import { observable } from 'mobx';

interface Props {
  className?: string;
  resourceStore?: ResourceStore;
  resourceActions?: ResourceActions;
  profileStore?: ProfileStore;
  profileActions?: ProfileActions;
}

export enum Tab {
  FMV = 1,
  HighAlt = 2,
  Fusion = 3
}

export enum TabName {
  FMV = 'FMV',
  HighAlt = 'High Alt',
  Fusion = 'Fusion'
}

@observer
export class TabContainer extends React.Component<Props> {
  @observable selectedState: number;

  async sortSelected(e: any) {
    this.selectedState = parseInt(e.target.value, 10);
    if (e.target.value >= 0) {
      await this.props.profileActions!.updateSort(parseInt(e.target.value, 10));
      await this.props.resourceActions!.sortResources();
    }
  }

  async componentWillReceiveProps(props: any) {
    if (props.profileStore!.profile !== undefined) {
      if (props.profileStore!.profile.specialty === null) {
        await this.clickTab(1);
      }
      await this.clickTab(props.profileStore!.profile.specialty!);
    }
  }

  clickTab = async (tab: number) => {
    this.props.resourceStore!.setActiveTab(tab);
    this.makeItSelected(tab);
    if (tab !== this.props.profileStore!.profile.specialty) {
      await this.props.profileActions!.changeDefaultTab(tab);
    }
  };

  makeItSelected = (tab: number) => {
    let els = document.getElementsByClassName('selectedTab');
    Array.prototype.forEach.call(els, function (el: any) {
      el.classList.remove('selectedTab');
    });
    if (document.getElementsByClassName('tab' + tab).length > 0) {
      document.getElementsByClassName('tab' + tab)[0].classList.add('selectedTab');
    }
  };

  render() {
    return (
      <div
        className={this.props.className + ' tabContainer'}
      >
        <div className="tabSection">
        {
          Object.keys(Tab).filter((tab: any) => !isNaN(Number(tab))).map((tab: any) => {
            return (
              <div key={tab} className={'tab tab' + tab}>
                <div onClick={() => this.clickTab(tab)}>{TabName[Tab[tab]]}</div>
              </div>
            );
          })
        }
        </div>
        <div className="searchSection">
          <div className="filterSection">
            <SearchIcon/>
            <input
              onChange={async (e) => {
                if (e.target.value === '') {
                  (document.querySelector('.sortSelector') as HTMLSelectElement).value
                    = this.props.profileStore!.profile.sort.toString();
                } else {
                  (document.querySelector('.sortSelector') as HTMLSelectElement).value = '';
                }
                await this.props.resourceActions!.filterResources(e.target.value);
              }}
              placeholder="Search"
              value={this.props.resourceStore!.filter}
            />
          </div>
          <div className="sortSection">
            Sort By:
            <select
              className="sortSelector"
              onChange={async (e) => {
                await this.sortSelected(e);
              }}
              value={this.props.profileStore!.profile ? this.props.profileStore!.profile.sort : 0}
            >
              <option value={Sort.None}/>
              <option value={Sort.MostClicked}>Most Clicked</option>
              <option value={Sort.Newest}>Newest</option>
              <option value={Sort.Alphabetical}>Alphabetical</option>
            </select>
            <DropdownIcon/>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledTabContainer = inject('resourceStore', 'profileStore', 'resourceActions')(styled(TabContainer)`
  display: flex;
  position: relative;
  
  .tab {
    display: inline-block;
    z-index: auto;
    width: 30%;
    height: 30px;
    background: #576476;
    color: #FFFFFF;
    font-size: 16px;
    border-radius: 6px 6px 0px 0px;
    margin-right: 2px;
    line-height: 36px;
    text-align: center;
    margin-right: 5px;
    cursor: pointer;
  }
  
  .selectedTab {
    background: #1F2226;
    transition: background 0.2s ease;
    box-shadow: -4px -4px 10px rgba(0, 0, 0, 0.25), 4px 4px 10px rgba(0, 0, 0, 0.25);
  }
  
  .tabSection {
    width: 40%;
  }
  
  .searchSection {
    display: flex;
    width: 60%;
    align-items: center;
    justify-content: flex-end;
  }
  
  .filterSection {
    display: flex;
    height: 25px;
    line-height: 25px;
    width: 219px;
    background: #FFFFFF;
    border-radius: 20px;
    padding-left: 2px;
    padding-top: 1px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  
  .filterSection > input {
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    width: 182px;
    outline: none;
    background: none;
    border: none;
  }
  
  .sortSection {
    margin-left: 17px;
    font-size: 12px;
    color: #FFFFFF;
    .dropIcon {
      width: 10px;
      height: 10px;
      margin-left: -10px;
      margin-right: 15px;
    }
  }
    
  .sortSelector {
    position: relative;
    -webkit-appearance: none;
    margin-left: 5px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #FFFFFF;
    background: none;
    color: #FFFFFF;
    border-radius: 0 0 0 0;
    font-size: 12px;
    outline: none;
    width: 100px;
  }
`);