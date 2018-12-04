import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ResourceStore } from '../resource/stores/ResourceStore';
import { ProfileStore } from '../../profile/ProfileStore';
import { ProfileActions } from '../../profile/ProfileActions';
import { Sort } from '../resource/ResourceModel';
import { DropdownIcon } from '../../icon/DropdownIcon';

const Person = require('../../icon/Person.png');

interface Props {
  className?: string;
  resourceStore?: ResourceStore;
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
  async componentWillReceiveProps(props: any) {
    if (this.props.profileStore!.profile.specialty === null) {
      await this.clickTab(1);
    }
    await this.clickTab(this.props.profileStore!.profile.specialty!);
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
        {
          Object.keys(Tab).filter((tab: any) => !isNaN(Number(tab))).map((tab: any) => {
            return (
              <div key={tab} className={'tab tab' + tab}>
                <div onClick={() => this.clickTab(tab)}>{TabName[Tab[tab]]}</div>
              </div>
            );
          })
        }
        <div className="profileBanner">
          <div className="sortSection">
            Sort By:
            <select
              className="sortSelector"
            >
              <option value={Sort.MostClicked}>Most Clicked</option>
            </select>
            <DropdownIcon/>
          </div>
          <div className="profileSection">
            {
              this.props.profileStore!.profile &&
              this.props.profileStore!.profile.name
            }
            <img className="personImage" src={Person}/>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledTabContainer = inject('resourceStore', 'profileStore')(styled(TabContainer)`
  display: flex;
  padding-left: 10px;
  position: relative;
  
  .profileBanner {
    align-items: center;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: white;
    font-family: Amaranth;
    z-index: 10;
    width: 650px;
  }
  
  .profileSection {
    align-items: center;
    display: flex;
    color: white;
  }
  
  .sortSection {
    .dropIcon {
      width: 10px;
      height: 10px;
      margin-left: -10px;
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
    font-family: Amaranth;
    border-radius: 0 0 0 0;
    font-size: 12px;
    outline: none;
    width: 76px;
  }
  
  .tab {
    display: inline-block;
    z-index: auto;
    width: 133px;
    height: 36px;
    background: #545454;
    color: #FFFFFF;
    font-family: Amaranth;
    font-size: 16px;
    border-radius: 6px 6px 0px 0px;
    margin-right: 2px;
    line-height: 36px;
    text-align: center;
    margin-right: 5px;
    cursor: pointer;
  }
  
  .selectedTab {
    background: #AEA4BF;
    z-index: 2;
    box-shadow: -3px -4px 6px rgba(0,0,0,0.25), 3px -4px 6px rgba(0,0,0,0.25);
  }
    
  .personImage {
    width: 31px;
    height: 31px;
    margin-right: 4px;
    margin-left: 10px;
  }
`);