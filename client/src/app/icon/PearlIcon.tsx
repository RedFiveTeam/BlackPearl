import * as React from 'react';

export const PearlIcon = () => {
  const pathD = 'M7 14C10.866 14 14 10.866 14 7C14 3.134 10.866 0 7 0C3.13401 0 0 3.134 0 7C0 10.866 3.13401 14 7 ' +
    '14ZM12.24 6.36C12.24 9.65162 9.57162 12.32 6.28 12.32C4.8364 12.32 3.51268 11.8068 2.48134 10.9528C3.58018 ' +
    '12.1845 5.17952 12.96 6.96 12.96C10.2737 12.96 12.96 10.2737 12.96 6.96C12.96 4.909 11.9309 3.09836 10.3609 ' +
    '2.01627C11.5176 3.1034 12.24 4.64734 12.24 6.36Z';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <g clipPath="url(#clip0)">
        <path fillRule="evenodd" clipRule="evenodd" d={pathD} fill="#080C12"/>
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="14" height="14" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};