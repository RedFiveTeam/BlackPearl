import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { ProfileStore } from './ProfileStore';
import { StyledATODay } from '../component/widgets/time/ATODay';

const Person = require('../icon/Person.png');

interface Props {
  className?: string;
  profileStore?: ProfileStore;
}

@observer
export class ProfileContainer extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledATODay className="atoDay"/>
        <div className="profileSection">
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

export const StyledProfileContainer = inject('profileStore')
(styled(ProfileContainer)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #000000;
  font-family: Amaranth;
  width: 360px;
  
  .profileSection {
    position: relative;
    left: -10px;
    top: -8px;
    align-items: center;
    display: flex;
    height: 27px;
    width: 250px;
    padding-left: 27px;
    border-left: 1px solid #000000;
  }
  
  .personImage {
    width: 31px;
    height: 31px;
    margin-right: 4px;
    margin-left: 10px;
  }
  
  .atoDay {
    height: 46px;
    position: relative;
    font-size: 36px;
    font-family: Amaranth;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  }
`);