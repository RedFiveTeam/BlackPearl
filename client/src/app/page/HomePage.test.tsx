import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePage } from './HomePage';
import { StyledAddResourcePopup } from '../component/popup/AddResourcePopup';
import { ResourceStore } from '../component/resource/stores/ResourceStore';
import { ResourceModel } from '../component/resource/ResourceModel';
import { StyledCardContainer } from '../component/card/CardContainer';
import { StyledLoadingOverlay } from '../component/loading/LoadingOverlay';
import { OperationStore } from '../component/card/operation/stores/OperationStore';
import { OperationModel } from '../component/card/operation/OperationModel';
import { StyledAddOperationPopup } from '../component/popup/AddOperationPopup';
import { StyledInformationContainer } from '../component/card/information/InformationContainer';
import { StyledOperationContainer } from '../component/card/operation/OperationContainer';
import { StyledAppBanner } from '../component/AppBanner';
import { ProfileModel } from '../profile/ProfileModel';
import { StyledConfirmLogoutPopup } from '../component/popup/ConfirmLogoutPopup';

describe('HomePage', () => {
  let subject: ShallowWrapper;
  let resourceStore: ResourceStore;
  let operationStore: OperationStore;
  let classificationStore: any;
  let classificationActions: any;
  let metricActions: any;
  let returnResourcesInCategorySpy: jest.Mock;
  let profileStore: any;
  let profileActions: any;
  let loginActions: any;

  beforeEach(() => {
    metricActions = {
      logMetric: jest.fn()
    };

    profileStore = {
      profile: new ProfileModel(null, 'cardID', 'AltId', 1, 0, 1),
      hasProfile: true,
      displayLogoutModal: jest.fn(),
      setDisplayLogoutModal: jest.fn(),
      loginMatches: []
    };

    profileActions = {
      setProfile: jest.fn(),
      checkForPreviousProfile: jest.fn(),
      checkForCookie: jest.fn()
    };

    classificationStore = {
      hydrate: jest.fn()
    };

    classificationActions = {
      initializeStore: jest.fn()
    };

    loginActions = {
      createNewProfile: jest.fn()
    };

    resourceStore = new ResourceStore();
    operationStore = new OperationStore();

    returnResourcesInCategorySpy = jest.fn();

    resourceStore.returnResourcesInCategory = returnResourcesInCategorySpy;

    subject = shallow(
      <HomePage
        resourceStore={resourceStore}
        operationStore={operationStore}
        metricActions={metricActions}
        profileStore={profileStore}
        profileActions={profileActions}
        classificationStore={classificationStore}
        classificationActions={classificationActions}
        loginActions={loginActions}
      />
    );
  });

  it('should display a card', () => {
    expect(subject.find(StyledCardContainer).exists()).toBeTruthy();
  });

  it('should not display a add resource popup by default', () => {
    expect(subject.find(StyledAddResourcePopup).exists()).toBeFalsy();
  });

  it('should display add resource popup', () => {
    expect(subject.find(StyledAddResourcePopup).exists()).toBeFalsy();
    resourceStore.setPendingResource(new ResourceModel(null, '', ''));
    expect(subject.find(StyledAddResourcePopup).exists()).toBeTruthy();
  });

  it('should have a CardContainer', () => {
    expect(subject.find(StyledCardContainer).exists()).toBeTruthy();
  });

  it('should render the loading overlay', () => {
    resourceStore.setLoading(true);
    expect(subject.find(StyledLoadingOverlay).exists()).toBeTruthy();
  });

  it('should hide and show an add operation popup', () => {
    expect(subject.find(StyledAddOperationPopup).exists()).toBeFalsy();
    operationStore.setPendingOperation(new OperationModel(0, '', '', ''));
    expect(subject.find(StyledAddOperationPopup).exists()).toBeTruthy();
  });

  it('should render an information card container', () => {
    expect(subject.find(StyledInformationContainer).exists).toBeTruthy();
  });

  it('should render a operations container', () => {
    expect(subject.find(StyledOperationContainer).exists()).toBeTruthy();
  });

  it('should have a header', () => {
    expect(subject.find(StyledAppBanner).exists()).toBeTruthy();
  });

  it('should display the confirm logout popup', () => {
    profileStore.setDisplayLogoutModal(true);
    expect(subject.find(StyledConfirmLogoutPopup).exists()).toBeTruthy();
  });
});
