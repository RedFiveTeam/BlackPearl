import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ResourceStore } from '../resource/stores/ResourceStore';
import { ProfileStore } from '../../profile/ProfileStore';

const Person = require('../../icon/Person.png');

interface Props {
  className?: string;
  resourceStore?: ResourceStore;
  profileStore?: ProfileStore;
}

export enum Tab {
  FMV = 1,
  HighAlt = 2,
  Fusion = 3,
  MOC = 4
}

export enum TabName {
  FMV = 'FMV',
  HighAlt = 'High Alt',
  Fusion = 'Fusion',
  MOC = 'MOC'
}

@observer
export class TabContainer extends React.Component<Props> {
  componentDidMount() {
    this.makeItSelected(Tab.FMV);
  }

  clickTab = (tab: number) => {
    this.props.resourceStore!.setActiveTab(tab);
    this.makeItSelected(tab);
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
          {
            this.props.profileStore!.profile &&
            this.props.profileStore!.profile.name
          }
          <img className="personImage" src={Person}/>
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
    right: 0px;
    display: flex;
    font-size: 12px;
    color: white;
    font-family: Amaranth;
    z-index: 10;
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