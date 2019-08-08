import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { StyledPopupModal } from './PopupModal';
import { ResourceStore } from '../resource/stores/ResourceStore';

interface Props {
  className?: string;
  resourceStore?: ResourceStore;
}

@observer
export class SetupGoPopup extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <StyledPopupModal
          title={'Setup "Go" Instructions'}
          onCancel={this.props.resourceStore!.toggleGoPopup}
        >
          <div>
            <br/>You can now search The Black Pearl from<br/>
            the Chrome Address Bar!<br/><br/>
            Visit the following address in a new tab<br/><br/>
            <code>chrome://settings/searchEngines</code><br/><br/>
            Click the Add button and set the following values<br/><br/>
            <table cellSpacing={'5px'}>
              <tr>
                <td align={'left'}>Search Engine</td>
                <td align={'left'}><code>Black Pearl</code></td>
              </tr>
              <tr>
                <td align={'left'}>Keyword</td>
                <td align={'left'}><code>go</code></td>
              </tr>
              <tr>
                <td align={'left'}>URL</td>
                <td align={'left'}>
                  <code>{window.location.protocol + '//' + window.location.host + '/api/resources/go?q=%s'}</code>
                </td>
              </tr>
            </table>
            <br/><br/>
            Next time you want to search for something, type "go website title" into<br/>
            the Address Bar to be taken straight there!<br/><br/>
          </div>
        </StyledPopupModal>
      </div>
    );
  }
}

export const StyledSetupGoPopup = inject('resourceStore')(styled(SetupGoPopup)`

.modal {
  width: 550px;
  height: 400px;
}

table {
  padding-left: 30px;
}

div {
  color: white;
}

.cancelButton {
  padding-bottom: 25px;
  content: "CLOSE";
}

`);
