import * as React from 'react';

export const FavoriteIcon = () => {
  const pathD = 'M16 8.10596C16 12.5242 12.4183 16.106 8 16.106C3.58172 16.106 0 12.5242 0 8.10596C0 3.68768 3.58172 ' +
    '0.105957 8 0.105957C12.4183 0.105957 16 3.68768 16 8.10596ZM7.17714 14.186C10.939 14.186 13.9886 11.1364 13.9886' +
    ' 7.37453C13.9886 5.41721 13.163 3.6527 11.841 2.41027C13.6353 3.64694 14.8114 5.71625 14.8114 8.06024C14.8114 ' +
    '11.8473 11.7414 14.9174 7.95428 14.9174C5.91945 14.9174 4.09163 14.0311 2.83582 12.6234C4.01449 13.5994 5.52732 ' +
    '14.186 7.17714 14.186ZM9.15464 6.51673L8 2.9631L6.84536 6.51673H3.10885L6.13175 8.71299L4.9771 12.2666L8 ' +
    '10.0704L11.0229 12.2666L9.86825 8.71299L12.8911 6.51673H9.15464Z';

  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d={pathD} fill="#FFFFFF"/>
    </svg>

  );
};