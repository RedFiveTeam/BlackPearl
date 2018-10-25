import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { AcronymStore } from './AcronymStore';
import { StyledAcronym } from './Acronym';
import { AcronymActions } from './AcronymActions';

interface Props {
  acronymStore?: AcronymStore;
  acronymActions?: AcronymActions;
  className?: string;
}

@observer
export class AcronymContainer extends React.Component<Props> {
  async componentDidMount() {
    await this.props.acronymActions!.setAllAcronyms();
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="title">Acronym Search</div>
        <input
          className="acronymSearch"
          onChange={async (e) => { await this.props.acronymActions!.setFilteredAcronyms(e.target.value); }}
        />
        <div className="acronymList">
          {
            this.props.acronymStore!.filteredAcronyms &&
            this.props.acronymStore!.filteredAcronyms.map((acronym, index) => {
              return (
                <StyledAcronym
                  acronym={acronym}
                  key={index}
                  className="acronym"
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export const StyledAcronymContainer = inject('acronymStore', 'acronymActions')(styled(AcronymContainer)`
  font-family: Alegreya Sans;
  text-align: center;
  font-size: 24px;
  color: #FFFFFF;
  background: #364958;
  width: 350px;
  min-width: 350px;
  height: 300px;
  border-radius: 10px;
  margin-left: 8px;
  
  .title {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  
  .acronymSearch {
    width: 324px;
    height: 20px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    outline: none;
  }

  .acronymList {
  height: 190px;
  width: 324px;
  overflow: auto;
  font-size: 13px;
  background: #EAEAEA;
  border-left: solid 5px #EAEAEA;
  border-top: solid 10px #EAEAEA;
  border-bottom: solid 10px #EAEAEA;
  border-radius: 0px 0px 10px 10px;
  text-align: left;
  color: #000000;
  margin-left: 10px;
  }
  
`);