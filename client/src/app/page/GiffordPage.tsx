import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { LogableActions } from '../component/metrics/metric/MetricModel';
import { MetricActions } from '../component/metrics/metric/MetricActions';
const Gifford = require('../resources/gifford.json');
const GroupPicture = require('../resources/groupPicture.jpg');

interface Props {
  className?: string;
  metricActions?: MetricActions;
}

@observer
export class GiffordPage extends React.Component<Props> {
  async componentDidMount() {
    await this.props.metricActions!.logMetric(LogableActions.VISIT, 'Gifford');
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <br/><br/>
        <div
          className="title"
        >
          Thank you!
        </div>
        <br/><br/>
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
        <br/><br/>
        <div
          className="groupPicture"
        >
          <img src={GroupPicture}/>
        </div>
        <br/>
        <div
          className="body"
        >
          Thank you so much, Colonel Gifford, for affording us the amazing opportunity to stand up the DGS-1 Software
          Development Team! We have all been having a ton of fun working very hard to help make the mission better
          and would not have been able to do it without you!
        </div>
        <br/><br/>
      </div>
    );
  }
}

export const StyledGiffordPage = inject('metricActions')(styled(GiffordPage)`
text-align: center;
font-family: monowidth;
color: white;


.title {
  font-size: 68px;
}

.gifford {
  font-size: 5px;
  font-family: monospace;
  background: white;
  width: 650px;
  height: 680px;
  padding-top: 25px;
  margin: auto;
  color: black;
}

.body {
  font-size: 24px;
  width: 850px;
  margin: auto;
}

.groupPicture img{
  width: 400px;
  height: 250px;
}
`);