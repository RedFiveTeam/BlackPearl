import * as React from 'react';

export const LeftArrowIcon = () => {
  const pathD = 'M5.58579 15.5858C4.80474 16.3668 4.80474 17.6332 5.58579 18.4142L18.3137 31.1421C19.0948 31.9232 ' +
    '20.3611 31.9232 21.1421 31.1421C21.9232 30.3611 21.9232 29.0948 21.1421 28.3137L9.82843 17L21.1421 ' +
    '5.68629C21.9232 4.90524 21.9232 3.63891 21.1421 2.85786C20.3611 2.07682 19.0948 2.07682 18.3137 2.85786L5.58579 ' +
    '15.5858ZM10 15H7V19H10V15Z';

  return (
    <svg width="25" height="38" viewBox="0 0 25 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <path d={pathD} fill="#4C4A4A"/>
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0.271973"
          width="24.7279"
          height="37.4558"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dx="-1" dy="2"/>
          <feGaussianBlur stdDeviation="2"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
    </svg>

  );
};