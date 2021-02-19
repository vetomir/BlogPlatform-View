import styled, {keyframes} from "styled-components";
import {colors} from "./Colors";

export const animationWrapperAnimation = keyframes`
  0%{
    transform: scale(1);
    background-color: ${colors.black};
  }
  50%{
    transform: scale(1);
  }
  60%{
    transform: scale(1);
    background-color: ${colors.indigo};
  }
  70%{
    transform: scale(1.02);
  }
  100%{
    transform: scale(1);
    background-color: ${colors.black};
  }
`

export const AnimationLoadingWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  position: absolute;
  opacity: 1;
  background-color: ${colors.black};
  animation: ${animationWrapperAnimation} 3000ms infinite;
`

export const ModuleShowUp = keyframes`
  from{
    opacity: .2;
  }
  to{
    opacity: 1;
  }
`
