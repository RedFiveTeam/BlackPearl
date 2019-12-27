import * as React from 'react';
import classNames = require('classnames');
import styled from 'styled-components';

interface Props {
  title: string;
  value: number;
  className?: string;
}

export const Metric = (props: Props) => {
  return (
    <div className={classNames('metric', props.className)}>
      <div className={classNames('metric-value', `metric-value--${props.className}`, 'number')}>
        {props.value}
      </div>
      <div className={classNames('metric-title', `metric-title--${props.className}`, 'counter')}>
        {props.title}
      </div>
    </div>
  );
};

export default styled(Metric)`
  .number {
    font-size: 64px;
    color: #fff;
  }
  
  .counter {
    display: inline-block;
    text-align: center;
  }
`;