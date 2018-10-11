import * as React from 'react';

export const AddResourceIcon = () => {
  const pathD = 'M19 9.5C19 14.7466 14.7466 19 9.5 19C4.25342 19 0 14.7466 0 9.5C0 4.25342 4.25342 0 9.5 0C14.7466 0 ' +
    '19 4.25342 19 9.5ZM8.52295 16.7202C12.9902 16.7202 16.6113 13.0986 16.6113 8.63135C16.6113 6.30713 15.6309 ' +
    '4.21191 14.061 2.73633C16.1919 4.20508 17.5884 6.66211 17.5884 9.4458C17.5884 13.9429 13.9429 17.5884 9.4458 ' +
    '17.5884C7.0293 17.5884 4.85889 16.5361 3.36768 14.8647C4.76709 16.0234 6.56348 16.7202 8.52295 16.7202ZM8.5 ' +
    '8.4751V4H10.5V8.48291L15.0034 8.49951L14.9961 10.542L10.5 10.5249V15H8.5V10.5176L3.99609 10.5005L4.00342 ' +
    '8.4585L8.5 8.4751Z';

  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
        <path fillRule="evenodd" clipRule="evenodd" d={pathD} fill="#15191C"/>
      </g>
    </svg>
  );
};