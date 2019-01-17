import * as React from 'react';

export const CancelIcon = () => {
  const pathD = 'M13.18 0L8 5.18L2.82 0L0 2.82L5.18 8L0 13.18L2.82 16L8 10.82L13.18 16L16 13.18L10.82 8L16' +
    ' 2.82L13.18 0Z';

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={pathD} fill="#76ACED"/>
    </svg>
  );
};