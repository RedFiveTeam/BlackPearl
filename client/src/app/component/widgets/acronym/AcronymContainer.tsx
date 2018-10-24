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
        <div className="title">Acronym List</div>
        <div className="acronymList">
          {
            this.props.acronymStore!.acronyms.map((acronym) => {
              return (
                <StyledAcronym
                  acronym={acronym.acronym}
                  definition={acronym.definition}
                  key={acronym.id!}
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
  height: 547px;
  border-radius: 10px;
  margin-left: 8px;
  
  .title {
    margin-top: 17px;
    margin-bottom: 17px;
  }

  .acronymList {
  height: 412px;
  width: 324px;
  overflow: auto;
  font-size: 13px;
  background: #FFFFFF;
  border-left: solid 5px #FFFFFF;
  border-top: solid 30px #FFFFFF;
  border-bottom: solid 30px #FFFFFF;
  text-align: left;
  color: #000000;
  margin-left: 10px;
  }
  
`);