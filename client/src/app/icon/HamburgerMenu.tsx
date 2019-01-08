import * as React from 'react';

export const HamburgerMenuIcon = () => {
  const pathD = 'M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z';

  return (
    <svg id="hamburgerIcon" width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={pathD} fill="#FBFDFF"/>
    </svg>
  );
};