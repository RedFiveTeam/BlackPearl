import * as React from 'react';
import styled, { withTheme } from 'styled-components';

interface Props {
  theme?: any;
  className?: string;
}

export const LoadingOverlay = (props: Props) => {
  return (
    <div className={props.className}>
      <div className="ball-scale-ripple-multiple">
        <div/>
        <div/>
        <div/>
      </div>
    </div>
  );
};

export const StyledLoadingOverlay = styled(withTheme(LoadingOverlay))`
    background: rgba(0,0,0,0.5);
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    position: fixed;
    z-index: 100;
    
  .ball-scale-ripple-multiple {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translateY(-25px);
    transform: translateY(-25px);
    z-index: 99;
        }

  .ball-scale-ripple-multiple > div:nth-child(1) {
    -webkit-animation-delay: -.6s;
    animation-delay: -.6s;
  }

  .ball-scale-ripple-multiple > div:nth-child(2) {
    -webkit-animation-delay: -.4s;
    animation-delay: -.4s;
  }

  .ball-scale-ripple-multiple > div:nth-child(3) {
    -webkit-animation-delay: -.2s;
    animation-delay: -.2s;
  }

  .ball-scale-ripple-multiple > div {
    position: absolute;
    top: -2px;
    left: -26px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 2px solid #fff;
    -webkit-animation: ball-scale-ripple-multiple 1.25s 0s infinite cubic-bezier(.21, .53, .56, .8);
    animation: ball-scale-ripple-multiple 1.25s 0s infinite cubic-bezier(.21, .53, .56, .8);
  }

  @keyframes ball-scale-ripple-multiple {
    0% {
        -webkit-transform: scale(.1);
        transform: scale(.1);
        opacity: 1;
    }
    70% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: .7;
    }
    100% {
        opacity: 0;
    }
}
`;