import * as React from 'react';

export const FavoriteCategoryIcon = () => {
  const pathD = 'M11.988 0C5.364 0 0 5.376 0 12C0 18.624 5.364 24 11.988 24C18.624 24 24 18.624 ' +
    '24 12C24 5.376 18.624 0 11.988 0ZM17.076 19.2L12 16.14L6.924 19.2L8.268 13.428L3.792 9.552L9.696 ' +
    '9.048L12 3.6L14.304 9.036L20.208 9.54L15.732 13.416L17.076 19.2Z';
  return (
    <svg
      id="favoriteCategoryIcon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathD}
        fill="#5689F3"
      />
    </svg>
  );
};