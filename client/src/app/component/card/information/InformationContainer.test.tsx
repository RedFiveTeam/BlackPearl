import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { InformationContainer } from './InformationContainer';
import { StyledInformationCard } from './InformationCard';

describe('InformationContainer', () => {
  let subject: ShallowWrapper;
  let informationStore: any;
  let informationActions: any;

  beforeEach(() => {

    informationActions = {
      setupInformation: jest.fn()
    };

    informationStore = {
      imageServer: '',
      callOutFormat: '',
      imageServerJWICS: '',
      auabServer: '',
      navcentServer: '',
      dsnNumber: '',
      svoipNumber: '',
      tsvoipNumber: ''
    };

    subject = shallow(
      <InformationContainer
        informationStore={informationStore}
        informationActions={informationActions}
      />
    );
  });

  it('should setup store on load', () => {
    expect(informationActions.setupInformation).toHaveBeenCalled();
  });

  it('should render an information card', () => {
    expect(subject.find(StyledInformationCard).exists()).toBeTruthy();
  });
});