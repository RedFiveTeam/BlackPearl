import * as React from 'react';

const pathD1 = 'M11.988 0C5.364 0 0 5.376 0 12C0 18.624 5.364 24 11.988 24C18.624 24 24 18.624 24 12C24 5.376 18.624 ' +
  '0 11.988 0ZM12 21.6C6.696 21.6 2.4 17.304 2.4 12C2.4 6.696 6.696 2.4 12 2.4C17.304 2.4 21.6 6.696 21.6 12C21.6 ' +
  '17.304 17.304 21.6 12 21.6Z';

const pathD2 = 'M12.6001 6H10.8001V13.2L17.1001 16.98L18.0001 15.504L12.6001 12.3V6Z';

export const ClockIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={pathD1} fill="#93A7C3"/>
      <path d={pathD2} fill="#93A7C3"/>
    </svg>
  );
};