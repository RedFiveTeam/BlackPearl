import * as React from 'react';

export const DeleteIcon = () => {
  const pathD = 'M9.77778 5.33333V14.2222H2.66667V5.33333H9.77778ZM8.44444 0H4L3.11111 ' +
    '0.888889H0V2.66667H12.4444V0.888889H9.33333L8.44444 0ZM11.5556 3.55556H0.888889V14.2222C0.888889 ' +
    '15.2 1.68889 16 2.66667 16H9.77778C10.7556 16 11.5556 15.2 11.5556 14.2222V3.55556Z';

  return (
    <svg
      id="DeleteAcronymIcon"
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={pathD} fill="#76ACED"/>
    </svg>
  );
};