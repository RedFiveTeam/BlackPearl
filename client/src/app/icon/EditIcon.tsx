import * as React from 'react';

export const EditIcon = () => {
  const pathA = 'M0.95282 15.9124L2.40534 12.3677L4.09386 13.9276L0.95282 15.9124Z';
  const pathB = 'M10.6743 2.83021L12.3632 4.36674L4.61201 13.2958L2.92306 11.7593L10.6743 2.83021Z';
  const pathC = 'M12.2648 0.912354L13.9528 2.44801L12.832 3.73915L11.144 2.2035L12.2648 0.912354Z';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 14 16" fill="none">
      <path
        d={pathA}
        fill="#FFF"
      />
      <path
        d={pathB}
        fill="#FFF"
      />
      <path
        d={pathC}
        fill="#FFF"
      />
    </svg>
  );
};