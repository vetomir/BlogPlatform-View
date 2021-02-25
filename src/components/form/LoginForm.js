import styled, {keyframes} from "styled-components";
import {colors} from "../utils/Colors";

const appear = keyframes`
  from {
    opacity: .2;
  }

  to {
    opacity: 1;
  }
`;
export const LoginForm = styled.div`
  min-height: 100vh;
  animation: ${appear} 1s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
  padding: 5rem;
  margin: 0 auto;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
  .Form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding: 2rem 1rem 1rem 1rem;
    label{
      color: ${colors.white};
      margin: 1rem 0 0 0;
    }
    Input{
      text-align: center;
    }
    Button{
      margin-top: 2rem;
    }
  }
`;
