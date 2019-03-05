import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

interface Props {
  className?: string;
  classification?: string;
}

@observer
export class ClassificationBanner extends React.Component<Props> {
  renderCss() {
    let css;
    switch (this.props.classification) {
      default: {
        css = {
          background: 'green'
        };
        return css;
        break;
      }
      case 'DYNAMIC CLASSIFICATION UP TO SECRET//NOFORN': {
        css = {
          background: 'red'
        };
        return css;
        break;
      }
      case 'DYNAMIC CLASSIFICATION UP TO TOP SECRET//SI/TK/NOFORN': {
        css = {
          background: 'green'
        };
        return css;
        break;
      }
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={this.renderCss()}
      >
        {
          this.props.classification
        }
      </div>
    );
  }
}

export const StyledClassificationBanner = styled(ClassificationBanner)`
  text-align: center;
  width: 101%;
  top: 0;
  z-index: 1000;
  position: fixed;
  height: 27px;
  font-weight: bold;
  font-size: 20px;
`;