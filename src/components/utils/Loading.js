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
    transform: scale(.9);
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
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  position: absolute;
  opacity: 1;
  background-color: ${colors.black};
  animation: ${animationWrapperAnimation} 3000ms infinite;
`
export const animationLoadingPostSingleWrapperAnimation = keyframes`
  0%{
    transform: scale(1);
    border-color: ${colors.black};
  }
  50%{
    transform: scale(1);
  }
  60%{
    transform: scale(1);
    border-color: ${colors.indigo};
  }
  70%{
    transform: scale(.8);
  }
  100%{
    transform: scale(1);
    border-color: ${colors.black};
  }
`

export const AnimationLoadingPostSingleWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 80vh;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  position: absolute;
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: .5rem solid ${colors.indigo};
  border-radius: 10px;
  padding: 1rem;
  animation: ${animationLoadingPostSingleWrapperAnimation} 5000ms infinite;
  
  div{
    position: relative;
    background-color: ${colors.black};
    width: 100%;
    height: 500px;
    border-radius: 10px;
    animation: ${animationLoadingPostSingleWrapperAnimation} 4500ms infinite;
    border: .5rem solid ${colors.indigo};
    margin-bottom: 2rem;
    h1{
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      width: 70%;
    }
    p{
      position: absolute;
      bottom: 0;
      left: 1rem;
      width: 70%;
    }
  }
  h1{
    background-color: ${colors.black};
    width: 90%;
    height: 2rem;
    animation: ${animationWrapperAnimation} 4000ms infinite;
    margin-bottom: 2rem;
  }
  p{
    background-color: ${colors.black};
    width: 95%;
    height: 1rem;
    animation: ${animationWrapperAnimation} 3000ms infinite;
    margin-bottom: 1rem;
  }
`;

export const AnimationLoadingHeaderBarWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  position: absolute;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div{
    background-color: ${colors.black};
    width: calc(20%);
    height: 100px;
    animation: ${animationWrapperAnimation} 5000ms infinite;
    border-radius: 10px;
  }
`;

export const AnimationLoadingCommentBarWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  position: absolute;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div{
    background-color: ${colors.black};
    width: calc(30%);
    height: 100px;
    animation: ${animationWrapperAnimation} 4500ms infinite;
    border-radius: 10px;
  }
`;

export const AnimationLoadingHeaderWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  position: absolute;
  opacity: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .big{
    background-color: ${colors.black};
    width: calc(50% - 1rem);
    height: 100%;
    border: .5rem solid ${colors.indigo};
    animation: ${animationLoadingPostSingleWrapperAnimation} 6000ms infinite;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1{
      background-color: ${colors.black};
      width: 60%;
      height: 2rem;
      animation: ${animationWrapperAnimation} 3000ms infinite;
      margin-bottom: 2rem;
    }
    h2{
      background-color: ${colors.black};
      width: 50%;
      height: 1.5rem;
      animation: ${animationWrapperAnimation} 3500ms infinite;
      margin-bottom: 2rem;
    }
    p{
      background-color: ${colors.black};
      width: 50%;
      height: 1rem;
      animation: ${animationWrapperAnimation} 4000ms infinite;
      margin-bottom: 2rem;
    }
  }
  .small{
    display: flex;
    flex-wrap: wrap;
    width: calc(49% - 1rem);
    justify-content: space-between;
    align-content: space-between;
    height: 95%;
    div{
      border-radius: 10px;
      width: calc(45% - 1rem);
      background-color: ${colors.indigo};
      height: calc(45% - 1rem);
      animation: ${animationWrapperAnimation} 4000ms infinite;
    }
  }
`;

export const ModuleShowUp = keyframes`
  from{
    opacity: .2;
  }
  to{
    opacity: 1;
  }
`
