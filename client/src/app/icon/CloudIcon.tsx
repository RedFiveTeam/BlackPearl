import * as React from 'react';

export const CloudIcon = () => {
  const pathD = 'M25.8 7.248C24.8933 3.108 20.8533 0 16 0C12.1467 0 8.8 1.968 7.13333 4.848C3.12 5.232 0 8.292' +
    ' 0 12C0 15.972 3.58667 19.2 8 19.2H25.3333C29.0133 19.2 32 16.512 32 13.2C32 10.032 29.2667 7.464 25.8' +
    ' 7.248Z';

  return (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={pathD} fill="#93A7C3"/>
    </svg>
  );
};
