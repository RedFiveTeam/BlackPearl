import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Sort } from '../component/resource/ResourceModel';
import { DropdownIcon } from '../icon/DropdownIcon';
import { ProfileStore } from './ProfileStore';
import { ProfileActions } from './ProfileActions';
import { observable } from 'mobx';
import { ResourceActions } from '../component/resource/actions/ResourceActions';
import { SearchIcon } from '../icon/SearchIcon';

const Person = require('../icon/Person.png');

interface Props {
  className?: string;
  profileStore?: ProfileStore;
  profileActions?: ProfileActions;
  resourceActions?: ResourceActions;
}

@observer
export class ProfileContainer extends React.Component<Props> {
  @observable selectedState: number;

  async sortSelected(e: any) {
    this.selectedState = parseInt(e.target.value, 10);
    if (e.target.value >= 0) {
      await this.props.profileActions!.updateSort(parseInt(e.target.value, 10));
      await this.props.resourceActions!.sortResources();
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="profileBanner">
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

export const StyledProfileContainer = inject('profileStore', 'profileActions', 'resourceActions')
(styled(ProfileContainer)`
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
  
  .searchSection {
    display: flex;
    align-items: center;
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
  }
  
  .filterSection > input {
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    font-family: Amaranth;
    width: 182px;
    outline: none;
    background: none;
    border: none;
  }
  
  .sortSection {
    margin-left: 20px;
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
  
  .personImage {
    width: 31px;
    height: 31px;
    margin-right: 4px;
    margin-left: 10px;
  }

`);