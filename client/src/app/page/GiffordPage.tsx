import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
const Gifford = require('../resources/gifford.json');
const GroupPicture = require('../resources/groupPicture.jpg');

interface Props {
  className?: string;
}

@observer
export class GiffordPage extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className="title"
        >
          Thank you!
        </div>
        <div
          className="gifford"
        >
        {
          Gifford.image.map((line: any, index: number) => {
            return (
              <div
                key={index}
              >
                {line}
              </div>
            );
          })
        }
        </div>
        <div
          className="body"
        >
          Thank you so much, Colonel Gifford, for affording us the amazing opportunity to stand up the DGS-1 Software
          Development Team! We have all been having a ton of fun working very hard to help make the mission better
          and would not have been able to do it without you!
        </div>
        <div
          className="groupPicture"
        >
          <img src={GroupPicture}/>
        </div>
      </div>
    );
  }
}

export const StyledGiffordPage = styled(GiffordPage)`
text-align: center;
font-family: monowidth;

.title {
  font-family: Iglesia;
  font-size: 68px;
}

.gifford {
  font-size: 5px;
  font-family: monospace;
}

.body {
  font-family: Amaranth;
  font-size: 24px;
}

.groupPicture img{
  width: 400px;
  height: 250px;
}
`;