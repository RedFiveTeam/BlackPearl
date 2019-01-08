import * as React from 'react';

export const PearlIcon = () => {
  const pathD = 'M21 42C32.598 42 42 32.598 42 21C42 9.40201 32.598 0 21 0C9.40203 0 0 9.40201 0 21C0 32.598 9.40203 ' +
    '42 21 42ZM36.72 19.08C36.72 28.9549 28.7148 36.96 18.84 36.96C14.5092 36.96 10.538 35.4203 7.44403 ' +
    '32.8584C10.7405 36.5534 15.5386 38.88 20.88 38.88C30.8211 38.88 38.88 30.8211 38.88 20.88C38.88 14.727 ' +
    '35.7927 9.29508 31.0827 6.04881C34.5528 9.3102 36.72 13.942 36.72 19.08Z';
  return (
    <svg id="pearlIcon" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={pathD} fillRule="evenodd" clipRule="evenodd" fill="#FBFDFF"/>
    </svg>
  );
};