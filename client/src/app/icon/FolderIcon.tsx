import * as React from 'react';

export const FolderIcon = () => {
  const pathD = 'M18 2H10L8 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 ' +
    '14V4C20 2.9 19.1 2 18 2ZM18 14H2V4H18V14Z';

  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={pathD} fill="#545454"/>
    </svg>

  );
};