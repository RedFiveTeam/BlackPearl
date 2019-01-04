import * as React from 'react';

export const ThreeDotIcon = () => {
  const pathD1 = 'M4.41559 2.65918C4.41559 3.76375 3.52016 4.65918 2.41559 4.65918C1.31102 4.65918 0.415588 3.76375 ' +
    '0.415588 2.65918C0.415588 1.55461 1.31102 0.65918 2.41559 0.65918C3.52016 0.65918 4.41559 1.55461 4.41559 ' +
    '2.65918Z';
  const pathD2 = 'M4.41559 10.6622C4.41559 11.7668 3.52016 12.6622 2.41559 12.6622C1.31102 12.6622 0.415588 11.7668 ' +
    '0.415588 10.6622C0.415588 9.55766 1.31102 8.66223 2.41559 8.66223C3.52016 8.66223 4.41559 9.55766 4.41559 ' +
    '10.6622Z';
  const pathD3 = 'M4.41559 18.6653C4.41559 19.7699 3.52016 20.6653 2.41559 20.6653C1.31102 20.6653 0.415588 19.7699 ' +
    '0.415588 18.6653C0.415588 17.5607 1.31102 16.6653 2.41559 16.6653C3.52016 16.6653 4.41559 17.5607 4.41559 ' +
    '18.6653Z';

  return (
    <svg id="threeDot" width="5" height="21" viewBox="0 0 5 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={pathD1} fill="#E4E7EA"/>
      <path d={pathD2} fill="#E4E7EA"/>
      <path d={pathD3} fill="#E4E7EA"/>
    </svg>
  );
};